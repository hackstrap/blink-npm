import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    fontWeightSemiBold: number
    fontWeightExtraBold: number
  }

  interface TypographyOptions {
    fontWeightSemiBold: number
    fontWeightExtraBold: number
  }
}

// type Tuple<T, N, A extends T[] = []> = A["length"] extends N
//   ? A
//   : Tuple<T, N, [...A, T]>;
// const restOfShadows = (new Array(20) as Tuple<string, 20, []>).fill("");

export const defaultTheme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
      htmlFontSize: 15,
      fontSize: 15,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700,
      fontWeightExtraBold: 800,
      h1: {
        fontSize: '2.288rem',
        fontWeight: 800
      },
      h2: {
        fontSize: '1.939rem',
        fontWeight: 700
      },
      h3: {
        fontSize: '1.643rem',
        fontWeight: 600
      },
      h4: {
        fontSize: '1.392rem',
        fontWeight: 600
      },
      subtitle1: {
        fontSize: '1.18rem',
        fontWeight: 500
      },
      subtitle2: {
        fontSize: '1rem',
        fontWeight: 500
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 300
      },
      body2: {
        fontSize: '0.847rem',
        fontWeight: 300
      },
      overline: {
        fontSize: '0.718rem',
        fontWeight: 300,
        textTransform: 'none'
      },
      button: {
        textTransform: 'capitalize',
        fontWeight: 400
      }
    },
    palette: {
      primary: {
        main: '#0066eb'
      },
      secondary: {
        main: '#ddecff',
        light: '#ebf5ff'
      },
      grey: {
        A100: '#fafafa',
        A200: '#f7f7f7',
        50: '#f5f5f5',
        100: '#f0f0f0',
        200: '#efefef',
        300: '#e5e5e5',
        400: '#cccccc',
        500: '#9d9d9d',
        600: '#989898',
        700: '#525252',
        800: '#18181b'
      },
      error: {
        main: '#ef0000'
      },
      text: {
        primary: '#18181b',
        secondary: '#f5f5f5',
        disabled: '#cccccc',
        hint: '#0066eb'
      },
      divider: '#e6e6e6',
      background: {
        paper: '#f5f5f5',
        default: '#ffffff'
      }
    },
    shape: {
      borderRadius: 10
    },
    breakpoints: {
      /**========================================================================
       * *                                INFO
       * value         |0px     480px    780px    1025px   1600px
       * key           |xs      sm       md       lg       xl
       * screen width  |--------|--------|--------|--------|-------->
       * range         |   xs   |   sm   |   md   |   lg   |   xl
       *========================================================================**/
      values: {
        xs: 0,
        sm: 480,
        md: 780,
        lg: 1400,
        xl: 1600
      }
    }
    // shadows: [
    //   "none",
    //   "0px 0px 5px rgba(0,0,0,0.16)",
    //   "0px 0px 6px rgba(0,0,0,0.16)",
    //   "0px 0px 7px rgba(0,0,0,0.16)",
    //   "0 3px 6px rgba(0,0,0,0.08)",
    //   ...restOfShadows,
    // ],
  }),
  {
    breakpoints: ['xs', 'sm', 'md', 'lg'],
    factor: 2.25,
    variants: [
      'h1',
      'h2',
      'h3',
      'h4',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'overline',
      'button'
    ]
  }
)
