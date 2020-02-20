const path = require('path').resolve()
const fs = require('fs')

const getDataLib = require('./lib/get_data.lib')
const versionExtend = require('./extend/version.extend')
const commonLib = require('./lib/common.lib')

module.exports = async function commonRun(req) {
  let returnData = {data: {}}
  
  // Line 54
  let _g5_path = g5_path(req)

  // Line 56
  let config = require('../config')(req, {g5_path: _g5_path})

  // Line 123
  // 완두콩님이 알려주신 보안관련 오류 수정
  // $member 에 값을 직접 넘길 수 있음
  returnData.config = {}
  returnData.member = {}
  returnData.board = {}
  returnData.group = {}
  returnData.g5 = {}

  // Line 143
  let dbconfig_file = 'data/dbconfig.js'
  if(fs.existsSync(path + '/' + dbconfig_file)) {
    req.userData.dbconfig = require(path + '/' + dbconfig_file)()
  }

  // Line 224
  returnData.config = await getDataLib.getConfig(req)

  // Line 273
  // QUERY_STRING
  let qstr = ''

  // Line 276
  if(req.query.sca) {
    let sca = commonLib.cleanXSSTags(req.query.sca.trim())
    if(sca) {
      sca = sca.replace(/[\<\>\'\"\\\'\\\"\%\=\(\)\/\^\*]/, "")
      qstr += '&amp;sca=' + encodeURI(sca)
    }

    returnData.sca = sca
  } else {
    returnData.sca = ''
  }

  // Line 357
  if(req.query.bo_table) {
    returnData.bo_table = req.query.bo_table.trim().replace(/[^a-z0-9_]/i, '').substring(0, 20)
  } else {
    returnData.bo_table = ''
  }

  // Line 468
  // 회원, 비회원 구분
  let is_member = false
  let is_guest = false
  let is_admin = '';
  if (returnData.member.mb_id) {
    is_member = true
    is_admin = commonLib.isAdmin(returnData.member.mb_id, {
      config: returnData.config,
      group: returnData.group,
      board: returnData.board
    })
    returnData.member.mb_dir = returnData.member.mb_id.substring(0, 2)
} else {
    is_guest = true
    returnData.member.mb_id = ''
    returnData.member.mb_level = 1 // 비회원의 경우 회원레벨을 가장 낮게 설정
  }
  returnData.isMember = is_member
  //returnData.isGuest = is_guest
  returnData.isAdmin = is_admin

  // Line 607
  req.userData.isMobile = false

  // Line 656
  // common.js 파일을 수정할 필요가 없도록 확장합니다.
  // ...하지만 JS 버전에서는 확장 구현 안하고 그냥 로드합니다.
  versionExtend(req)

  // Line 689
  returnData.htmlProcess = new commonLib.HTMLProcess()

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
