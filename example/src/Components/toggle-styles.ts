import { makeStyles } from '@material-ui/core';

const buttonWidthDesktop = 5;
const buttonHeightDesktop = 2.5;

const buttonWidthMobile = 4;
const buttonHeightMobile = 2;

const insideCircleDesktop = 2.1;
const insideCircleMobile = `${buttonHeightMobile}rem - 4px`;

export const useToggleStyles = makeStyles(
  (theme) => ({
    root: {
      width: buttonWidthDesktop.toString() + 'rem',
      height: buttonHeightDesktop.toString() + 'rem',
      padding: 0,
      margin: theme.spacing(1),
      overflow: 'visible',
      [theme.breakpoints.down(600)]: {
        width: buttonWidthMobile.toString() + 'rem',
        height: buttonHeightMobile.toString() + 'rem',
      },
    },
    switchBase: {
      padding: 0,
      marginTop: '0.2rem',
      '& + $track': { boxShadow: theme.shadows[5] },
      '&$checked': {
        transform: 'translateX(38px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundImage: 'linear-gradient(#2d83f2, #0066eb)',
          opacity: 1,
          border: 'none',
          marginTop: 0,
        },
      },
      '&$focusVisible $thumb': {
        color: theme.palette.primary.main,
        border: '6px solid #fff',
      },
      [theme.breakpoints.down(600)]: {
        '&$checked': {
          transform: 'translateX(30px)',
        },
        marginTop: '2px',
        marginLeft: '2px',
      },
    },
    thumb: {
      marginLeft: '0.2rem',
      width: insideCircleDesktop.toString() + 'rem',
      height: insideCircleDesktop.toString() + 'rem',
      boxShadow: 'none',
      [theme.breakpoints.down(600)]: {
        width: `calc(${insideCircleMobile})`,
        height: `calc(${insideCircleMobile})`,
        marginLeft: 0,
      },
    },
    track: {
      borderRadius: '3rem',
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#cccccc',
      opacity: 1,
    },
    checked: {},
    focusVisible: {},
  }),
  { index: 1 }
);
