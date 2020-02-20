const commonLib = require('./lib/common.lib')

module.exports = function headSubRun(req, res, data = {}) {
  let returnData = {data: {}}

  // Line 5
  // TODO 테마 head.sub.php 파일
  
  // Line 11
  //$g5_debug['php']['begin_time'] = $begin_time = get_microtime();

  // Line 13
  let g5_head_title = ''
  if(!data.common.g5.title) {
    data.common.g5.title = data.common.config.cf_title
    g5_head_title = data.common.g5.title
  } else {
    g5_head_title = data.common.g5.title
    g5_head_title += ' | ' + data.common.config.cf_title
  }

  // Not need because ejs automatically escapes tags before appending
  //$g5['title'] = strip_tags($g5['title']);
  //$g5_head_title = strip_tags($g5_head_title);
  
  // Line 25
  // TODO 현재 접속자

  // Line 73
  returnData.isMember = data.common.isMember
  returnData.isAdmin = data.common.isAdmin
  returnData.bo_table = data.common.bo_table
  returnData.sca = data.common.sca
  returnData.board = data.common.board

  // Line 85
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/jquery-1.12.4.min.js"></script>', 0, data.common.htmlProcess)
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/jquery-migrate-1.4.1.min.js"></script>', 0, data.common.htmlProcess)
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/jquery.menu.js?ver=' + req.userData.jsVer + '"></script>', 0, data.common.htmlProcess)
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/common.js?ver=' + req.userData.jsVer + '"></script>', 0, data.common.htmlProcess)
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/wrest.js?ver=' + req.userData.jsVer + '"></script>', 0, data.common.htmlProcess)
  commonLib.addJavascript('<script src="' + req.userData.jsURL + '/placeholders.min.js"></script>', 0, data.common.htmlProcess)
  commonLib.addStylesheet('<link rel="stylesheet" href="' + req.userData.cssURL + '/font-awesome/css/font-awesome.min.css">', 0, data.common.htmlProcess)

  if(req.userData.isMobile) {
    commonLib.addJavascript('<script src="' + req.userData.jsURL + '/modernizr.custom.70111.js"></script>', 1, data.common.htmlProcess) // overflow scroll 감지
  }

  // Line 102
  if(returnData.isMember) {
    let srAdminMsg = ''
    if(returnData.isAdmin === 'super') srAdminMsg = '최고관리자'
    else if(returnData.isAdmin === 'group') srAdminMsg = '그룹관리자'
    else if(returnData.isAdmin === 'board') srAdminMsg = '게시판관리자'
  
    returnData.hdLoginMsg = srAdminMsg + commonLib.getText(data.common.member.mb_nick) + '님 로그인 중 '
  }

  returnData._status = 'OK'
  returnData.g5_head_title = g5_head_title
  returnData.config = data.common.config
  returnData.bodyScript = data.common.g5.body_script

  return returnData
}
