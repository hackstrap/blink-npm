import { makeStyles } from '@material-ui/core';

export const useGeneralStyles = makeStyles((theme) => ({
  container_styles: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    minHeight: '100vh',
  },
  input_overline: {
    margin: '0.5rem 0.3rem 1rem',
    display: 'block',
  },
  snackbar: {
    padding: '0.75em 1.5em',
    borderRadius: 10,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.5rem',
    },
  },
}));
