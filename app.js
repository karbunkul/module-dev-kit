const mdk = require('./lib/index')

console.log(mdk.moduleDir(module))

console.log(mdk.packageInfo(module))

console.log(mdk.loadConfig({name: 'test-config', module}))
