const path = require('path').resolve()
const fs = require('fs')

const getDataLib = require('./lib/get_data.lib')
const versionExtend = require('./extend/version.extend')

module.exports = async function commonRun(req) {
  let returnData = {data: {}}
  
  // Line 54
  let _g5_path = g5_path(req)

  // Line 56
  let config = require('../config')(req, {g5_path: _g5_path})

  // Line 126
  returnData.member = {}

  // Line 143
  let dbconfig_file = 'data/dbconfig.js'
  if(fs.existsSync(path + '/' + dbconfig_file)) {
    req.userData.dbconfig = require(path + '/' + dbconfig_file)()
  }

  // Line 224
  returnData.config = await getDataLib.getConfig(req)

  // Line 468
  // 회원, 비회원 구분
  let is_member = false
  let is_guest = false
  let is_admin = '';
  if (returnData.member.mb_id) {
    is_member = true
    is_admin = is_admin(returnData.member.mb_id)
    returnData.member.mb_dir = substr(returnData.member.mb_id,0,2)
} else {
    is_guest = true
    returnData.member.mb_id = ''
    returnData.member.mb_level = 1 // 비회원의 경우 회원레벨을 가장 낮게 설정
}

  // Line 607
  req.userData.isMobile = false

  // Line 656
  // common.js 파일을 수정할 필요가 없도록 확장합니다.
  // ...하지만 JS 버전에서는 확장 구현 안하고 그냥 로드합니다.
  versionExtend(req)

  returnData._status = 'OK'
  return returnData
}

// Line 33
function g5_path(req) {
  let result = {}

  result.path = path // useless
  result.url = `${req.protocol}://${req.hostname}${![80, 443].includes(global.appPort) ? `:${require('../config')().PORT}` : ''}`

  return result
}
