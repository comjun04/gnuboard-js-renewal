const path = require('path').resolve()
const fs = require('fs')

const getDataLib = require('./lib/get_data.lib')

module.exports = function commonRun(req) {
  let returnData = {data: {}}

  // Line 143
  let dbconfig_file = 'data/dbconfig.js'
  if(fs.existsSync(path + '/' + dbconfig_file)) {
    req.userData.dbconfig = require(path + '/' + dbconfig_file)()
  }

  req.userData.config = getDataLib.getConfig(req)

  returnData._status = 'OK'
  return returnData
}
