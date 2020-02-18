module.exports = function headSubRun(req, res, data = {}) {
  let returnData = {data: {}}

  // 테마 head.sub.php 파일
  
  //$g5_debug['php']['begin_time'] = $begin_time = get_microtime();

  let g5_head_title = ''
  if(!req.userData.title) {
    req.userData.title = data.config.cf_title
    g5_head_title = req.userData.title
  } else {
    g5_head_title = req.userData.title
    g5_head_title += ' | ' + req.userData.config.cf_title
  }

  // Not need because ejs automatically escapes tags before appending
  //$g5['title'] = strip_tags($g5['title']);
  //$g5_head_title = strip_tags($g5_head_title);
  
  // TODO 현재 접속자

  

  returnData._status = 'OK'
  returnData.g5_head_title = g5_head_title
  returnData.config = data.config

  return returnData
}
