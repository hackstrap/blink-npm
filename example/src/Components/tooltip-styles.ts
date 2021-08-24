import { makeStyles } from '@material-ui/core';

export const useTooltipStyles = makeStyles((theme) => ({
  dropdown_root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    filter: `drop-shadow(${theme.shadows[11]})`,
    borderRadius: '0.75rem',
    color: theme.palette.grey[600],
  },
  dropdown_inner_root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem',
    gap: '0.5rem',
  },
  dropdown_arrow: {
    marginTop: '-3em !important',
    marginLeft: '-4px !important',
    color: theme.palette.background.default,
    width: '6em',
    height: '5em',
    zIndex: -1,
  },
}));
