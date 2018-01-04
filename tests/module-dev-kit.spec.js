const chai = require('chai')
const expect = chai.expect
const mdk = require('./../lib/index')

describe('Module dev kit module test', () => {
  it('check module export functions', () => {
    expect(mdk.runtime instanceof Function).to.equal(true)
    expect(mdk.moduleDir instanceof Function).to.equal(true)
    expect(mdk.packageInfo instanceof Function).to.equal(true)
    expect(mdk.loadConfig instanceof Function).to.equal(true)
  })
})
