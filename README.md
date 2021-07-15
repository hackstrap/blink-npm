# blink-npm

> This repo contains the code for blink npm pakage

[![NPM](https://img.shields.io/npm/v/@hackstrap/blink-npm)](https://www.npmjs.com/package/@hackstrap/blink-npm)

<br/>
<br/>

## Install

```bash
npm install --save @hackstrap/blink-npm
```

<br/>

#### For usage in Next.js application execute following command

```bash
npm install next-remove-imports
```

This will remove all .less/.css/.scss/.sass/.styl imports from all packages in node_modules.

```javascript
// add this piece of code in next.config.js file
const removeImports = require('next-remove-imports')({
  options: {}
})
module.exports = removeImports()
```

<br/>

```bash
npm i @material-ui/core@4.11.4
npm i @material-ui/icons@4.11.2
```

<br/>
<br/>

## Usage

```tsx
import React, { Component } from 'react'

import { BlinkApp } from 'blink-npm'
// Importing CSS files
import 'blink-npm/dist/index.css'
import 'react-date-range/dist/styles.css' // base css file from react-date-range
import 'react-date-range/dist/theme/default.css' // theme css file from react-date-range
// CSS files for @uiw/react-md-editor
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'

class Example extends Component {
  render() {
    return (
      <BlinkApp
        userInfo={{ Header: 'startup_name', accessor: 'startup_id' }}
        screen={'startupScreen'}
        view={'homeView'}
        page={'metrics'}
        apiRoute={'https://demo-organization.com/'}
        token={'token_value'}
      />
    )
  }
}
```

### Props which user can pass in BlinkApp

1. All the props passed here are stored in a global Object with the help of context API and can be accessed anywhere in the app.
2. **screen**,**view**,**page** props are used for in app navigation. Pass the correct values to load the required page.
3. Pass name and id of startup/investor in the format shown above in **userInfo** props.

## Overall Structure of BlinkApp

Pass following values to **screen**,**view**,**page** props to load required pages accordingly

### Screen => startupScreen:

- #### View => home
  - page => metrics
  - page => notes
- #### View => tables
  - page => revenue
  - page => expenses
  - page => employee
  - page => notes
- #### View => settings
  - page => profile

### Screen => investorScreen

- #### View => dashboard
  - page => metrics
  - page => notes
- #### View => settings
  - page => profile

## License

MIT © [AbhijeetNandvikar](https://github.com/AbhijeetNandvikar)
