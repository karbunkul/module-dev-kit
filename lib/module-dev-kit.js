const debug = require('debug')('module-dev-kit:main')
const fs = require('fs')
const path = require('path')

/**
 * @class ModuleDevKit
 */
class ModuleDevKit {
  runtime () {
    debug('call runtime')
    const runtime = (typeof process === 'undefined' || process.type === 'renderer')
      ? 'browser' : 'node'
    debug(runtime)
    return runtime
  }

  moduleDir () {
    debug('call moduleDir')
    let root = false
    require.main.paths.forEach((dir) => {
      dir = dir.replace(/\/node_modules$/, '')
      if (!root && fs.existsSync(path.join(dir, 'package.json'))) {
        root = dir
        debug(root)
      }
    })
    return root
  }

  packageInfo () {
    debug('call packageInfo')
    const moduleDir = this.moduleDir()
    if (moduleDir) {
      try {
        const filename = path.join(moduleDir, 'package.json')
        return require(filename)
      } catch (err) {
        console.error(err)
      }
    }
    return false
  }

  loadConfig (options) {
    debug('call loadConfig')
    const {name = '', packageKey = ''} = options || {}
    const dir = this.moduleDir()
    if (dir) {
      if (packageKey !== '') {
        const info = this.packageInfo()
        if (info && info.hasOwnProperty(packageKey)) {
          debug('get config from package.json')
          return info[packageKey]
        }
      } else if (name !== '') {
        const files = fs.readdirSync(dir).filter((file) => {
          let pattern = new RegExp(`${name}\\.(js|json|yaml|yml)`)
          return pattern.test(file)
        })
        if (files.length > 0) {
          const ext = path.extname(files[0])
          debug(`parse config from ${path.join(dir, name + ext)}`)
          switch (ext) {
            case '.js':
            case '.json': {
              try {
                return require(path.join(dir, name + ext))
              } catch (err) {
                console.warn(err)
                return false
              }
            }
            case '.yaml':
            case '.yml': {
              try {
                require.resolve('js-yaml')
                const yaml = require('js-yaml')
                return yaml.safeLoad(fs.readFileSync(path.join(dir, name + ext), 'utf8'))
              } catch (err) {
                console.error('Module js-yaml not install. Call command in terminal npm install js-yaml --save for install')
                process.exit(err.code)
              }
            }
          }
        }
      }
    }
    return false
  }
}

/**
 * @type {ModuleDevKit}
 */
module.exports = ModuleDevKit
