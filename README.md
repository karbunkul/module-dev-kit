# Module development kit #

[![Build Status](https://travis-ci.org/karbunkul/module-dev-kit.svg?branch=master)](https://travis-ci.org/karbunkul/module-dev-kit)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Synopsis
Module development helpers

[![NPM](https://nodei.co/npm/module-dev-kit.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/module-dev-kit/)

## API reference

### runtime
Return {string} node or browser.

### moduleDir
- *module* **required** - NodeJs module object

Return {string|false} module root directory

### packageInfo
- *module* **required** - NodeJs module object

Return {string|false} package.json object

### loadConfig
- *options* **required** - options

Return {object|false} config object
## How to use

Import module-dev-kit.

```javascript

const mdk = require('module-dev-kit');
```

© Alexander Pokhodyun (Karbunkul) 2018