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
 * @property {object} module NodeJs module object
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
 * @param {object} module NodeJs module object
 * @return {string|false} module directory without ending slash
 */
module.exports.moduleDir = (module) => {
  return mdk.moduleDir(module)
}

/**
 * Get package.json object
 *
 * @param {object} module NodeJs module object
 * @return {object|false} package.json object
 */
module.exports.packageInfo = (module) => {
  return mdk.packageInfo(module)
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
