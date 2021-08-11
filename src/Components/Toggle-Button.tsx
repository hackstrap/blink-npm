import { Switch } from '@material-ui/core'
import React, { FC } from 'react'
import { useToggleStyles } from './toggle-styles'

export const Toggle: FC<{ onChange: () => void }> = (props) => {
  const classes = useToggleStyles()

  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
}
