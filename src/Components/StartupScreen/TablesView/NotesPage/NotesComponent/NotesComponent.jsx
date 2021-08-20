// @refresh reset
import {
  Button,
  capitalize,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Select,
  Typography,
  useTheme
} from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  useSlateStatic,
  useSelected,
  useFocused
} from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Range,
  Text,
  Element as SlateElement
} from 'slate'
import styles from './index.module.css'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import CodeIcon from '@material-ui/icons/Code'
import LooksOneIcon from '@material-ui/icons/LooksOne'
import LooksTwoIcon from '@material-ui/icons/LooksTwo'
import Looks3Icon from '@material-ui/icons/Looks3'
import Looks4Icon from '@material-ui/icons/Looks4'
import Looks5Icon from '@material-ui/icons/Looks5'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import { withHistory } from 'slate-history'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import { FormatListBulleted } from '@material-ui/icons'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import ImageIcon from '@material-ui/icons/Image'
import LinkIcon from '@material-ui/icons/Link'
import LinkOffIcon from '@material-ui/icons/LinkOff'
import axios from 'axios'
import { globalContext } from '../../../../../AppContext'
import { extractChartData } from '../../../../ChartsWrapper/MRRChart'
import escapeHtml from 'escape-html'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

export const KeyDownIcon = () => (
  <KeyboardArrowDownIcon
    style={{
      position: 'relative',
      transform: 'translateX(10px)',
      width: '18px',
      height: '18'
    }}
  />
)

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  }

  const children = node.children.map((n) => serialize(n)).join('')

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'heading-one':
      return `<h1>${children}</h1>`
    case 'heading-two':
      return `<h2>${children}</h2>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    case 'image':
      return `<img style="
        width: 100%;
        max-width: 500px;
        border-radius: 5px;" 
        src="${node.url}" />`
    default:
      return children
  }
}

// import { Button, Icon, Toolbar } from "../components";

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05);',
      borderRadius: '20px',
      backgroundColor: 'white',
      [theme.breakpoints.down('md')]: {
        padding: 16,
        paddingTop: 32,
        paddingBottom: 32
      },
      [theme.breakpoints.up('lg')]: {
        padding: 32
      }
    },
    notesHeading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginRight: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    galleryContainer: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      borderRadius: '20px',
      background: 'white',
      padding: '24px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05);',
      zIndex: '2',
      overflow: 'scroll',
      [theme.breakpoints.down('md')]: {
        transform: 'translateY(2.5rem)'
      },
      height: '350px'
    },
    galleryItem: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      marginBottom: '12px',
      marginTop: '12px'
    },
    image: {
      width: '100px',
      marginRight: 15
    },
    divider: {
      marginTop: '10px',
      marginBottom: '10px'
    }
  }
})

const NotesComponent = ({
  currentYear,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  setNoteData,
  noteData,
  saveChangeHandler,
  preview,
  selectedStartup
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [showYearConfig, setShowYearConfig] = React.useState(false)
  const monthsArray = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ]
  const renderMonthOptions = () => {
    return monthsArray.map((month, i) => {
      return (
        <MenuItem value={month} key={i}>
          {capitalize(month)}
        </MenuItem>
      )
    })
  }

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const appContext = React.useContext(globalContext)
  const editorRef = React.useRef()
  let editor = editorRef.current

  React.useEffect(() => {
    if (!editorRef.current)
      editorRef.current = withImages(withHistory(withReact(createEditor())), [])
    setValue(noteData)
  }, [noteData])

  const [value, setValue] = useState(noteData)

  const getChartName = (str) => {
    let strArr = str.split('_')
    strArr[0] = capitalize(strArr[0])
    return strArr.join(' ')
  }

  const extractChartData = (serverData) => {
    return serverData.map((item) => {
      if (item.chart_image)
        return (
          <MenuItem>
            <div className={classes.galleryItem}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <img
                  className={classes.image}
                  src={item.chart_image}
                  alt='chart'
                />
                <Typography>{getChartName(item.chart_name)}</Typography>
              </div>
              <Button
                variant='outlined'
                color='primary'
                size='small'
                style={{ width: '100%', marginTop: '15px' }}
                onClick={(e) => {
                  // copy to clipboard
                  e.preventDefault()
                  copyToClipboard(item.chart_image)
                }}
              >
                Copy Link
              </Button>
            </div>
            <Divider className={classes.divide} />
          </MenuItem>
        )
      else return <div></div>
    })
  }

  React.useEffect(() => {
    setShowSaveChange(true)
  }, [value])

  const [showGallery, setShowImageGallery] = useState(false)

  const [showMonthConfig, setShowMonthConfig] = useState(false)

  const [showSaveChange, setShowSaveChange] = useState(false)

  const [chartOptions, setChartOptions] = useState([])

  const renderYearOptions = () => {
    let years = []
    for (
      let i = new Date().getFullYear();
      i > parseInt(currentYear) - 200;
      i--
    ) {
      years = [...years, i.toString()]
    }
    return years.map((year, i) => {
      return (
        <MenuItem value={year} key={i}>
          {year}
        </MenuItem>
      )
    })
  }

  React.useEffect(() => {
    axios({
      method: 'get',
      url: `${appContext.apiRoute}v1/charts?startup_id=${selectedStartup.accessor}`,
      headers: {
        Authorization: appContext?.token
      }
    }).then((res) => {
      setChartOptions(extractChartData(res.data))
    })
  }, [selectedStartup])

  return (
    <div className={classes.mainContainer}>
      <div className={styles.notesHeading}>
        {noteData?.note_name ? noteData.note_name : 'Investor Data'}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.commonBtnContainer}>
          {showSaveChange && !preview ? (
            <Button
              variant='outlined'
              onClick={() => {
                saveChangeHandler(value)
                setShowSaveChange(false)
              }}
              className={styles.saveChanges}
            >
              Save
            </Button>
          ) : (
            <div></div>
          )}
        </div>

        <div className={styles.commonBtnContainer}>
          <Select
            value={currentMonth}
            onChange={(e) => {
              setCurrentMonth(e.target.value)
            }}
            variant='outlined'
            className={styles.dropdownButton}
          >
            {renderMonthOptions()}
          </Select>
        </div>
        <div className={styles.commonBtnContainer}>
          <Select
            value={currentYear}
            onChange={(e) => {
              setCurrentYear(e.target.value)
            }}
            variant='outlined'
            className={styles.dropdownButton}
          >
            {renderYearOptions()}
          </Select>
        </div>
        {!preview ? (
          <div className={styles.commonBtnContainer}>
            <Select
              value='Select Chart Image'
              variant='outlined'
              className={styles.dropdownButton}
              onClick={(e) => {
                e.target.value = 'Select Chart Image'
              }}
              onChange={(e) => {
                e.target.value = 'Select Chart Image'
              }}
            >
              <MenuItem value={'Select Chart Image'}>Choose Image</MenuItem>
              {chartOptions}
            </Select>
            {/* <Button
              variant="outlined"
              onClick={() => {
                setShowImageGallery(!showGallery);
              }}
              className={styles.dropDownBtn}
            >
              Select Image
              <KeyDownIcon />
            </Button>
            {showGallery ? (
              <div
                className={classes.galleryContainer}
                onMouseLeave={(e) => {
                  setShowImageGallery(false);
                }}
              >
                {chartOptions}
              </div>
            ) : (
              <div></div>
            )} */}
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.commonBtnContainer}>
          {!preview ? (
            <Button
              onClick={(e) => {
                // send email function
                const result = serialize(editor)
                copyToClipboard(result)
              }}
              className={styles.dropdownButton}
              variant='outlined'
            >
              Send Email
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className={classes.slateEditor}>
        {editor ? (
          <Slate
            editor={editor}
            value={value.note_data}
            onChange={(newValue) => {
              setValue({
                ...value,
                note_data: newValue
              })
            }}
          >
            {!preview ? (
              <Toolbar>
                <MarkButton format='bold' icon={<FormatBoldIcon />} />
                <MarkButton format='italic' icon={<FormatItalicIcon />} />
                <MarkButton
                  format='underline'
                  icon={<FormatUnderlinedIcon />}
                />
                <MarkButton format='code' icon='code' />
                <BlockButton format='heading-one' icon={<LooksOneIcon />} />
                <BlockButton format='heading-two' icon={<LooksTwoIcon />} />
                <BlockButton format='heading-three' icon={<Looks3Icon />} />
                <BlockButton format='block-quote' icon={<FormatQuoteIcon />} />
                <BlockButton
                  format='numbered-list'
                  icon={<FormatListNumbered />}
                />
                <BlockButton
                  format='bulleted-list'
                  icon={<FormatListBulleted />}
                />
                <InsertImageButton format='image' />
                <LinkButton />
                <RemoveLinkButton />
              </Toolbar>
            ) : (
              <div></div>
            )}
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder='Type something'
              renderPlaceholder={({ children, attributes }) => (
                <div {...attributes}>
                  {children}
                  <h2>{`${
                    capitalize(currentMonth) + ' ' + currentYear
                  } Investor Updates`}</h2>
                  <p>
                    In this section, startups can share updates regarding the
                    growth, sales, new partnerships, hires, and the other things
                    going on at the company.
                  </p>
                  <h2>Product Updates</h2>
                  <ul>
                    <li>Write about product update 1.</li>
                    <li>Write about Product update 2.</li>
                  </ul>
                  <h2>Growth Updates</h2>
                  <ul>
                    <li>Write about growth update 1.</li>
                    <li>Write about growth update 2.</li>
                  </ul>
                  <h2>Sales and new partnerships Updates</h2>
                  <ul>
                    <li>Write about sales updates.</li>
                    <li>Write about partnership updates.</li>
                  </ul>
                  <h2>New Hire Updates</h2>
                  <ul>
                    <li>Write about full-time hires updates.</li>
                    <li>Write about ESPOs Update.</li>
                  </ul>
                  <h2>Other Updates/Conclusion</h2>
                  Overall the summary for the month, in brief, and any points to
                  share can be done as a conclusion in this paragraph.
                </div>
              )}
              placeholder='Enter some rich text…'
              spellCheck
              autoFocus
              readOnly={preview ? true : false}
            />
          </Slate>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default NotesComponent

function copyToClipboard(text) {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', 'readonly')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true
  })
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = (props) => {
  let { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          style={{
            borderLeft: '2px solid #ddd',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 10,
            color: '#aaa',
            fontStyle: 'italic'
          }}
        >
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'image':
      return <Image {...props} />
    case 'link':
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const getButton = (type, color) => {
  switch (type) {
    case 'bold':
      return <FormatBoldIcon color={color} />
    case 'italic':
      return <FormatItalicIcon color={color} />
    case 'underline':
      return <FormatUnderlinedIcon color={color} />
    case 'code':
      return <CodeIcon color={color} />
    case 'heading-one':
      return <LooksOneIcon color={color} />
    case 'heading-two':
      return <LooksTwoIcon color={color} />
    case 'heading-three':
      return <Looks3Icon color={color} />
    case 'block-quote':
      return <FormatQuoteIcon color={color} />
    case 'numbered-list':
      return <FormatListNumbered color={color} />
    case 'bulleted-list':
      return <FormatListBulleted color={color} />
  }
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {getButton(
        format,
        isBlockActive(editor, format) ? 'primary' : 'disabled'
      )}
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {getButton(format, isMarkActive(editor, format) ? 'primary' : 'disabled')}
    </Button>
  )
}

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span {...props} ref={ref} className={className} />
))

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={className} />
))

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} className={className} />
))

const withImages = (editor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}

const Image = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element?.url ? element.url : ''}
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '5px'
          }}
        />
      </div>
      {children}
    </div>
  )
}

const InsertImageButton = () => {
  const editor = useSlateStatic()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (url && !isImageUrl(url)) {
          alert('URL is not an image')
          return
        }
        insertImage(editor, url)
      }}
    >
      <ImageIcon color={'disabled'} />
    </Button>
  )
}

const isImageUrl = (url) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

// Handling links

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
  })
  return !!link
}

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
  })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : []
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const LinkButton = () => {
  const editor = useSlate()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <LinkIcon color={isLinkActive(editor) ? 'primary' : 'disabled'} />
    </Button>
  )
}

const RemoveLinkButton = () => {
  const editor = useSlate()

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      <LinkOffIcon color={isLinkActive(editor) ? 'primary' : 'disabled'} />
    </Button>
  )
}
