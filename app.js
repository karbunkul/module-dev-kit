const mdk = require('./lib/index')

const config = mdk.loadConfig({name: 'test-config'})
console.log(config)
