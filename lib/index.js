/**
 * @type {ModuleDevKit}
 */
const ModuleDevKit = require('./module-dev-kit')
const mdk = new ModuleDevKit()
/**
 * CUSTOM TYPES
 */

/**
 * @typedef {Object} LoadConfigOptions
 * @type {object}
 * @property {string} name config file name
 * @property {string|undefined} packageKey key in package.json file
 */

/**
 * Get current runtime
 *
 * @return {string} node or browser
 */
module.exports.runtime = () => {
  return mdk.runtime()
}

/**
 * Get module directory
 *
 * @return {string|false} module directory without ending slash
 */
module.exports.moduleDir = () => {
  return mdk.moduleDir()
}

/**
 * Get package.json object
 *
 * @return {object|false} package.json object
 */
module.exports.packageInfo = () => {
  return mdk.packageInfo()
}

/**
 * Load config from file or package.json
 *
 * @param {LoadConfigOptions} options
 * @return {object|false}
 */
module.exports.loadConfig = (options) => {
  return mdk.loadConfig(options)
}
