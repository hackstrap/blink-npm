import {
  capitalize,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  useTheme
} from '@material-ui/core'
import React, { useState } from 'react'
// import ReactQuill from "react-quill";
// import SunEditor from 'suneditor-react'
// import DropdownComponent from '../../../../DropdownComponent/DropdownComponent'
import styles from './index.module.css'
import MDEditor from '@uiw/react-md-editor'
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
    }
  }
})

// interface PropsInterface {
//   title: string
//   defaultValue?: string
// }

const NotesComponent = ({ title, defaultValue }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [value, setValue] = useState(defaultValue ? defaultValue : '')

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
    return monthsArray.map((month) => {
      return <option value={month}>{capitalize(month)}</option>
    })
  }

  return (
    <div className={classes.mainContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.notesHeading}>{title}</div>
        <div></div>
        <div>
          <Select variant='outlined' defaultValue={'January'}>
            <option aria-label='None' value='' />
            {renderMonthOptions()}
          </Select>
        </div>
        <div>
          <Select variant='outlined' defaultValue={'2021'}>
            <option aria-label='None' value='' />
            <option value={'2021'}>2021</option>
            <option value={'2020'}>2020</option>
            <option value={'2019'}>2019</option>
          </Select>
        </div>
      </div>

      <div>
        <MDEditor value={value} onChange={setValue} />
        {/* <MDEditor.Markdown source={value} /> */}
      </div>
    </div>
  )
}

export default NotesComponent
