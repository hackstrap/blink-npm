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
import React, { useState } from 'react'
// import ReactQuill from "react-quill";
// import SunEditor from 'suneditor-react'
// import DropdownComponent from '../../../../DropdownComponent/DropdownComponent'
import styles from './index.module.css'
import MDEditor, {
  title,
  title1,
  title2,
  title3,
  title4,
  title5,
  title6,
  bold,
  codeBlock,
  italic,
  strikethrough,
  hr,
  group,
  divider,
  link,
  quote,
  code,
  image,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  codeEdit,
  codeLive,
  codePreview,
  fullscreen,
  commands
} from '@uiw/react-md-editor'
import { loginForImageBucket } from '../../../../fetch'
// import MarkdownIt from "markdown-it";
// import MdEditor from "react-markdown-editor-lite";

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

// interface PropsInterface {
//   title: string
//   defaultValue?: string
// }

const NotesComponent = ({
  currentYear,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  setNoteData,
  noteData,
  saveChangeHandler
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  // const [value, setValue] = useState(noteData ? noteData.note_data : "");
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
        <MDEditor
          ref={noteRef}
          value={noteData?.note_data}
          onChange={(val) => handleChange(val)}
          commands={[
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6
              ],
              {
                name: 'title',
                groupName: 'title',
                buttonProps: { 'aria-label': 'Insert title' }
              }
            ),
            bold,
            codeBlock,
            italic,
            strikethrough,
            hr,
            group,
            divider,
            link,
            quote,
            code,
            unorderedListCommand,
            orderedListCommand,
            checkedListCommand,
            addChart
          ]}
        />
      </div>
    </div>
  )
}

export default NotesComponent
