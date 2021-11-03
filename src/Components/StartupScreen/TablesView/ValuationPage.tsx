import React from 'react'
import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => {
  return {
    mainTableContainer: {
      width: '100%',
      height: '90vh',
      marginTop: '64px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05);',
      borderRadius: '20px',
      padding: '64px',
      paddingTop: '48px',
      [theme.breakpoints.down('md')]: {
        padding: '32px',
        paddingTop: '32px',
        paddingBottom: '32px'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '15px',
        paddingTop: '32px',
        paddingBottom: '32px'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: 'white'
    }
  }
})

const ValuationPage = () => {
  //   const theme = useTheme();
  //   const classes = useStyles(theme);
  //   return (
  //     <Container maxWidth="lg">
  //       <div className={classes.mainTableContainer}>
  //         <Typography variant="h4" style={{ marginBottom: "2rem" }}>
  //           Valuation Form
  //         </Typography>

  //         <iframe
  //           style={{
  //             display: "flex",
  //             width: "100%",
  //             height: "100%",
  //             border: "none",
  //           }}
  //           src="https://docs.google.com/forms/d/e/1FAIpQLSfdLtvCjrXJeXgfVYGHkrMvi4Zow1ZN5ErO7cx48d77fMkt2A/viewform?embedded=true"
  //           width="640"
  //           height="3445"
  //         >
  //           Loading…
  //         </iframe>
  //       </div>
  //     </Container>
  //   );
  return <div>Hello</div>
}

export default ValuationPage
