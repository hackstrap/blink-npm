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
import SunEditor from 'suneditor-react'
import DropdownComponent from '../../../../DropdownComponent/DropdownComponent'
import styles from './index.module.css'
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

interface PropsInterface {
  title: string
  defaultValue?: string
}

const NotesComponent = ({ title, defaultValue }: PropsInterface) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : '')
  const options = {
    buttonList: [
      // default
      ['undo', 'redo'],
      [
        ':p-More Paragraph-default.more_paragraph',
        'font',
        'fontSize',
        'formatBlock',
        'paragraphStyle',
        'blockquote'
      ],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      [
        '-right',
        ':i-More Misc-default.more_vertical',
        'fullScreen',
        'showBlocks',
        'codeView',
        'preview',
        'print',
        'save',
        'template'
      ],
      ['-right', ':r-More Rich-default.more_plus', 'table', 'imageGallery'],
      ['-right', 'image', 'video', 'audio', 'link'],
      // (min-width: 992)
      [
        '%992',
        [
          ['undo', 'redo'],
          [
            ':p-More Paragraph-default.more_paragraph',
            'font',
            'fontSize',
            'formatBlock',
            'paragraphStyle',
            'blockquote'
          ],
          ['bold', 'underline', 'italic', 'strike'],
          [
            ':t-More Text-default.more_text',
            'subscript',
            'superscript',
            'fontColor',
            'hiliteColor',
            'textStyle'
          ],
          ['removeFormat'],
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          [
            '-right',
            ':i-More Misc-default.more_vertical',
            'fullScreen',
            'showBlocks',
            'codeView',
            'preview',
            'print',
            'save',
            'template'
          ],
          [
            '-right',
            ':r-More Rich-default.more_plus',
            'table',
            'link',
            'image',
            'video',
            'audio',
            'imageGallery'
          ]
        ]
      ],
      // (min-width: 767)
      [
        '%767',
        [
          ['undo', 'redo'],
          [
            ':p-More Paragraph-default.more_paragraph',
            'font',
            'fontSize',
            'formatBlock',
            'paragraphStyle',
            'blockquote'
          ],
          [
            ':t-More Text-default.more_text',
            'bold',
            'underline',
            'italic',
            'strike',
            'subscript',
            'superscript',
            'fontColor',
            'hiliteColor',
            'textStyle'
          ],
          ['removeFormat'],
          ['outdent', 'indent'],
          [
            ':e-More Line-default.more_horizontal',
            'align',
            'horizontalRule',
            'list',
            'lineHeight'
          ],
          [
            ':r-More Rich-default.more_plus',
            'table',
            'link',
            'image',
            'video',
            'audio',
            'imageGallery'
          ],
          [
            '-right',
            ':i-More Misc-default.more_vertical',
            'fullScreen',
            'showBlocks',
            'codeView',
            'preview',
            'print',
            'save',
            'template'
          ]
        ]
      ],
      // (min-width: 480)
      [
        '%480',
        [
          ['undo', 'redo'],
          [
            ':p-More Paragraph-default.more_paragraph',
            'font',
            'fontSize',
            'formatBlock',
            'paragraphStyle',
            'blockquote'
          ],
          [
            ':t-More Text-default.more_text',
            'bold',
            'underline',
            'italic',
            'strike',
            'subscript',
            'superscript',
            'fontColor',
            'hiliteColor',
            'textStyle',
            'removeFormat'
          ],
          [
            ':e-More Line-default.more_horizontal',
            'outdent',
            'indent',
            'align',
            'horizontalRule',
            'list',
            'lineHeight'
          ],
          [
            ':r-More Rich-default.more_plus',
            'table',
            'link',
            'image',
            'video',
            'audio',
            'imageGallery'
          ],
          [
            '-right',
            ':i-More Misc-default.more_vertical',
            'fullScreen',
            'showBlocks',
            'codeView',
            'preview',
            'print',
            'save',
            'template'
          ]
        ]
      ]
    ]
  }
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
      <SunEditor
        setOptions={options}
        defaultValue={value}
        onChange={(val) => setValue(val)}
      />
    </div>
  )
}

export default NotesComponent
