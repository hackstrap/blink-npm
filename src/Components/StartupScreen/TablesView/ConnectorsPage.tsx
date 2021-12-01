import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
  useTheme
} from '@material-ui/core'
import excelIcon from '../../../images/icons8-microsoft-excel-2019 1.svg'
import quickBooks from '../../../images/quick-books-logo.png'
import {
  ArrowBack,
  ArrowForward,
  ArrowRight,
  CloudUpload
} from '@material-ui/icons'
import axios from 'axios'
import { globalContext } from '../../../AppContext'

const useStyles = makeStyles((theme: Theme) => {
  return {
    page: {
      // width: "100%",
      marginTop: '2rem',
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        gap: 20
      }
    },
    mainBox: {
      background: 'white',
      borderRadius: '2rem',
      minHeight: '8rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '1rem'
    },
    boldText: {
      fontWeight: 'bold'
    }
  }
})

const ConnectorsPage = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const appContext = useContext(globalContext)
  const fallbackRoute = 'https://blink.hackstrap.com/'
  const [sheetLink, setSheetLink] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const getStartupInfo = async () => {
    const result = await axios({
      method: 'get',
      url: `${
        appContext?.apiRoute ? appContext?.apiRoute : fallbackRoute
      }v1/startup?startup_id=${
        appContext?.userInfo?.accessor ? appContext?.userInfo?.accessor : ''
      }`,
      headers: {
        Authorization: appContext?.token
      }
    })
    console.log(result?.data[0])
    setSheetLink(
      result?.data[0]?.data_input[0] ? result?.data[0]?.data_input[0] : ''
    )
  }

  useEffect(() => {
    getStartupInfo()
  }, [])

  const [showUploadSheet, setShowUploadSheet] = useState(false)
  const [showQuickbookUploadSheet, setShowQuickbookUploadSheet] =
    useState(false)

  const handleFileUpload = (data: any, type: string) => {
    if (type == 'excel') {
      return axios({
        method: 'post',
        url: `${
          appContext?.apiRoute ? appContext?.apiRoute : fallbackRoute
        }unity/v1/api/file_upload?startup_id=${appContext?.userInfo?.accessor}`,
        headers: {
          Authorization: appContext?.token,
          'Content-Type': 'multipart/form-data'
        },
        data: data
      })
    } else {
      return axios({
        method: 'post',
        url: `${
          appContext?.apiRoute ? appContext?.apiRoute : fallbackRoute
        }unity/v1/api/quickbooks_upload?startup_id=${
          appContext?.userInfo?.accessor
        }`,
        headers: {
          Authorization: appContext?.token,
          'Content-Type': 'multipart/form-data'
        },
        data: data
      })
    }
  }
  const renderExcelConnector = () => {
    return showUploadSheet ? (
      <div className={classes.mainBox}>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <label
            htmlFor='fileUpload'
            style={{
              padding: '1rem',
              border: '1px solid gray',
              borderRadius: '12px',
              marginLeft: '1rem',
              width: '200px',
              textAlign: 'center'
            }}
          >
            Upload Excel File
          </label>
          <small style={{ padding: '1rem' }}>{uploadMessage}</small>
          <input
            type='file'
            style={{ visibility: 'hidden' }}
            id='fileUpload'
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              console.log(e)
              const files = (e.target as HTMLInputElement).files || []
              if (files[0]) {
                const formData = new FormData()
                formData.append('file', files[0], files[0]?.name)
                handleFileUpload(formData, 'excel')
                  .then((res) => {
                    setUploadMessage(res.data)
                  })
                  .catch((err) => {
                    console.log(err)
                    setUploadMessage('Please check the file format')
                  })
              }
            }}
          />
          <button
            style={{
              marginLeft: 'auto',
              border: 'none',
              background: 'white'
            }}
            onClick={(e) => setShowUploadSheet(false)}
          >
            <ArrowBack />
          </button>
        </div>
      </div>
    ) : (
      <div className={classes.mainBox}>
        <div style={{ display: 'flex', width: '100%' }}>
          <img style={{ width: '50px', height: '50px' }} src={excelIcon} />
          <div style={{ marginLeft: '2rem' }}>
            <Typography className={classes.boldText}>
              Upload your data using Excel File
            </Typography>
            <button
              style={{
                border: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                marginTop: '12px',
                boxShadow: ''
              }}
            >
              <a
                href={sheetLink}
                download
                target='_blank'
                style={{ textDecoration: 'none' }}
              >
                Download Template
              </a>
            </button>
          </div>
          <button
            style={{
              marginLeft: 'auto',
              border: 'none',
              background: 'white'
            }}
            onClick={(e) => setShowUploadSheet(true)}
          >
            <ArrowForward />
          </button>
        </div>
      </div>
    )
  }
  const renderQuickBooksConnector = () => {
    return showQuickbookUploadSheet ? (
      <div className={classes.mainBox}>
        <div
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <label
            htmlFor='fileUpload'
            style={{
              padding: '1rem',
              border: '1px solid gray',
              borderRadius: '12px',
              marginLeft: '1rem',
              width: '200px',
              textAlign: 'center'
            }}
          >
            Upload Quickbooks Data
          </label>
          <small style={{ padding: '1rem' }}>{uploadMessage}</small>
          <input
            type='file'
            style={{ visibility: 'hidden' }}
            id='fileUpload'
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              console.log(e)
              const files = (e.target as HTMLInputElement).files || []
              if (files[0]) {
                const formData = new FormData()
                formData.append('file', files[0], files[0]?.name)
                handleFileUpload(formData, 'quickbooks')
                  .then((res) => {
                    setUploadMessage(res.data)
                  })
                  .catch((err) => {
                    console.log(err)
                    setUploadMessage('Please check the file format')
                  })
              }
            }}
          />
          <button
            style={{
              marginLeft: 'auto',
              border: 'none',
              background: 'white'
            }}
            onClick={(e) => setShowQuickbookUploadSheet(false)}
          >
            <ArrowBack />
          </button>
        </div>
      </div>
    ) : (
      <div className={classes.mainBox}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <img style={{ width: '50px', height: '50px' }} src={quickBooks} />
          <Typography
            style={{ marginLeft: '2rem' }}
            className={classes.boldText}
          >
            Upload your Quickbooks data
          </Typography>
          <button
            style={{
              marginLeft: 'auto',
              border: 'none',
              background: 'white'
            }}
            onClick={(e) => setShowQuickbookUploadSheet(true)}
          >
            <ArrowForward />
          </button>
        </div>
      </div>
    )
  }
  return (
    <Grid container spacing={3} style={{ marginTop: '2rem' }}>
      <Grid item lg={6} xs={12}>
        {renderExcelConnector()}
      </Grid>
      <Grid item lg={6} xs={12}>
        {renderQuickBooksConnector()}
      </Grid>
    </Grid>
  )
}

export default ConnectorsPage
