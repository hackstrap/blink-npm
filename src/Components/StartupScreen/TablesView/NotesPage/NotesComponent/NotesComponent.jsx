import {
  Button,
  capitalize,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Typography,
  useTheme
} from '@material-ui/core'
import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
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
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import FormatListNumbered from '@material-ui/icons/FormatListNumbered'
import { FormatListBulleted } from '@material-ui/icons'

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

  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ])

  const noteRef = React.useRef()

  // React.useEffect(() => {}, [noteData.note_data]);

  const handleChange = (value) => {
    setNoteData({
      ...noteData,
      note_data: value
    })
    setShowSaveChange(true)
  }

  const [showGallery, setShowImageGallery] = useState(false)

  const [showMonthConfig, setShowMonthConfig] = useState(false)

  const [showSaveChange, setShowSaveChange] = useState(false)

  const addImage = {
    name: 'addImage',
    keyCommand: 'addImage',
    buttonProps: { 'aria-label': 'Add Image' },
    icon: (
      <svg width='12' height='12' viewBox='0 0 520 520'>
        <path
          fill='currentColor'
          d='M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z'
        />
      </svg>
    ),
    execute: (state, api) => {
      let modifyText = `${state.selectedText}\n`
      if (!state.selectedText) {
        modifyText = `![](https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png)`
      }
      api.replaceSelection(modifyText)
    }
  }

  const addChart = {
    name: 'addChart',
    keyCommand: 'addChart',
    buttonProps: { 'aria-label': 'Add Image' },
    icon: <div>Add Chart</div>,
    execute: (state, api) => {
      let modifyText = `${state.selectedText}\n`
      if (!state.selectedText) {
        modifyText = `![](https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png)`
      }
      api.replaceSelection(modifyText)
    }
  }

  // React.useEffect(()=>{
  //   loginForImageBucket().then(res=>{
  //     clg(res)
  //   })
  // },[])

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
        {showSaveChange ? (
          <Button
            variant='outlined'
            onClick={() => {
              saveChangeHandler(noteData)
              setShowSaveChange(false)
            }}
          >
            Save Changes
          </Button>
        ) : (
          <div></div>
        )}

        <div>
          {showGallery ? (
            <div className={classes.galleryContainer}>
              <img
                src='https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png'
                alt=''
              />
              <img
                src='https://d2gdtie5ivbdow.cloudfront.net/media/images/chart_js_cover_js_visualization.png'
                alt=''
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
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

      <div>
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            setValue(newValue)
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
            <BlockButton format='numbered-list' icon={<FormatListNumbered />} />
            <BlockButton format='bulleted-list' icon={<FormatListBulleted />} />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder='Enter some rich text…'
            spellCheck
            autoFocus
          />
        </Slate>
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

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
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
