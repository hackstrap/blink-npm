import React, { ReactNode } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  Grid
} from '@material-ui/core'
import NotesComponent from './NotesComponent/NotesComponent'

const defaultText = `May 2021 Investor Updates
In this section, startups can share updates regaring the growth, sales, new partnerships, hires, and the other things going on at the company.

Product Updates
Write about product update 1.
Write about Product update 2.

Growth Updates
Write about growth update 1.
Write about growth update 2.

Sales and new partnerships Updates
Write about sales updates.
Write about partnership updates.

New Hire Updates
Write about full-time hires updates.
Write about ESPOs Update.

Other Updates/Conclusion
Over all the summary for the month in brief and any points to share can be done as a conclusion in this paragraph. `

const useStyles = makeStyles({
  page: {
    marginTop: '2rem',
    width: '100%'
  }
})

const NotesPage = () => {
  const theme = useTheme()
  const classes = useStyles()

  const notesConfig = [
    {
      Header: 'Investor Update',
      accessor: 'Hello'
    }
  ]

  const renderNotes = (config: { Header: string; accessor: string }[]) => {
    return config.map((chart) => {
      return (
        <Grid item xs={12}>
          <NotesComponent title={chart.Header} defaultValue={defaultText} />
          {/* <Note2 /> */}
        </Grid>
      )
    })
  }
  return (
    <div className={classes.page}>
      <Grid container spacing={4}>
        {renderNotes(notesConfig)}
      </Grid>
    </div>
  )
}

export default NotesPage
