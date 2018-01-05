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

  moduleDir (module) {
    debug('call moduleDir')
    if (!module || !module.hasOwnProperty('filename')) {
      throw new Error('Wrong module object')
    }
    const checkPackageRoot = (dir) => {
      return (fs.existsSync(path.join(dir, 'package.json')))
    }
    let currentModuleDir = path.dirname(module.filename)
    let leftLevels = currentModuleDir.split(path.sep).length
    while (leftLevels > 0) {
      if (checkPackageRoot(currentModuleDir)) {
        return currentModuleDir
      } else if (leftLevels === 1) {
        return false
      } else {
        currentModuleDir = path.resolve(currentModuleDir, '..')
        leftLevels--
      }
    }
    return currentModuleDir
  }

  packageInfo (module) {
    debug('call packageInfo')
    const moduleDir = this.moduleDir(module)
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
    const {name = '', module = undefined, packageKey = ''} = options || {}
    if (!module || !module.hasOwnProperty('filename')) {
      throw new Error('Wrong module object')
    }
    const dir = this.moduleDir(module)
    if (dir) {
      if (packageKey !== '') {
        const info = this.packageInfo(module)
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
