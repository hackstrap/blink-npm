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
  Select,
  Typography,
  useTheme
} from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
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
      zIndex: '2'
    },
    galleryItem: {
      display: 'flex',
      flexDirection: 'row',
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
  preview
}) => {
  console.log(noteData)
  const theme = useTheme()
  const classes = useStyles(theme)
  const [showYearConfig, setShowYearConfig] = React.useState(false)
  const monthsArray = [
    'janurary',
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
        <Typography
          onClick={() => {
            setCurrentMonth(month)
            setShowMonthConfig(false)
          }}
          key={i}
        >
          {capitalize(month)}
        </Typography>
      )
    })
  }

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const editorRef = React.useRef()
  let editor = editorRef.current

  React.useEffect(() => {
    if (!editorRef.current)
      editorRef.current = withImages(withHistory(withReact(createEditor())), [])
    setValue(noteData)
  }, [noteData])

  const [value, setValue] = useState(noteData)

  // const handleChange = (value) => {
  //   setNoteData({
  //     ...noteData,
  //     note_data: value,
  //   });
  //   setShowSaveChange(true);
  // };

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

  React.useEffect(() => {
    setShowSaveChange(true)
  }, [value])

  const [showGallery, setShowImageGallery] = useState(false)

  const [showMonthConfig, setShowMonthConfig] = useState(false)

  const [showSaveChange, setShowSaveChange] = useState(false)

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
        <Typography
          onClick={() => {
            setShowYearConfig(false)
            setCurrentYear(year)
          }}
          key={i}
        >
          {year}
        </Typography>
      )
    })
  }

  return (
    <div className={classes.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.notesHeading}>
          {noteData?.note_name ? noteData.note_name : 'Investor Data'}
        </div>
        {showSaveChange && !preview ? (
          <Button
            variant='outlined'
            onClick={() => {
              saveChangeHandler(value)
              setShowSaveChange(false)
            }}
          >
            Save Changes
          </Button>
        ) : (
          <div></div>
        )}
        {!preview && (
          <div>
            <Button
              variant='outlined'
              onClick={() => {
                setShowImageGallery(!showGallery)
              }}
            >
              Select Image
            </Button>
            {showGallery && !preview ? (
              <div
                className={classes.galleryContainer}
                onMouseLeave={(e) => {
                  setShowImageGallery(false)
                }}
              >
                <div className={classes.galleryItem}>
                  <img
                    className={classes.image}
                    src='https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png'
                    alt=''
                  />
                  <Typography>Revenue Chart</Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    style={{ marginLeft: '15px' }}
                    onClick={(e) => {
                      // copy to clipboard
                      e.preventDefault()
                      copyToClipboard(
                        'https://easybase.io/assets/images/posts_images/5-great-react-libraries-1.png'
                      )
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
                <Divider className={classes.divide} />
                <div className={classes.galleryItem}>
                  <img
                    className={classes.image}
                    src='https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png'
                    alt=''
                  />
                  <Typography>Revenue Chart</Typography>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    style={{ marginLeft: '15px' }}
                    onClick={(e) => {
                      // copy to clipboard
                      e.preventDefault()
                      copyToClipboard(
                        'https://easybase.io/assets/images/posts_images/5-great-react-libraries-1.png'
                      )
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
                <Divider className={classes.divide} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}

        <div>
          <Button
            onClick={(e) => {
              setShowMonthConfig(!showMonthConfig)
            }}
            variant='outlined'
          >
            {`Month: ${currentMonth}`}
          </Button>
          {showMonthConfig ? (
            <div
              className={styles.columnConfigBox}
              onMouseLeave={(e) => setShowYearConfig(false)}
            >
              {renderMonthOptions()}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <Button
            onClick={(e) => {
              setShowYearConfig(!showYearConfig)
            }}
            variant='outlined'
          >
            {`Year: ${currentYear}`}
          </Button>
          {showYearConfig ? (
            <div
              className={styles.columnConfigBox}
              onMouseLeave={(e) => setShowYearConfig(false)}
            >
              {renderYearOptions()}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <Button
          onClick={(e) => {
            // send email function
          }}
          variant='outlined'
        >
          Send Email
        </Button>
      </div>

      <div className={classes.slateEditor}>
        {editor && noteData ? (
          <Slate
            editor={editor}
            value={value?.note_data}
            onChange={(newValue) => {
              console.log(newValue)
              setValue({
                ...value,
                note_data: newValue
              })
            }}
          >
            <Toolbar>
              <MarkButton format='bold' icon={<FormatBoldIcon />} />
              <MarkButton format='italic' icon={<FormatItalicIcon />} />
              <MarkButton format='underline' icon={<FormatUnderlinedIcon />} />
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
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
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
  console.log(element)
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element?.url ? element.url : ''}
          style={{
            width: '100%',
            maxWidth: '400px',
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
