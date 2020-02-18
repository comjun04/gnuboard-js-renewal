module.exports = function headSubRun(req, res) {
  let returnData = {data: {}}

  // 테마 head.sub.php 파일
  
  //$g5_debug['php']['begin_time'] = $begin_time = get_microtime();

  if(!req.userData.title) {
    req.userData.title = req.userData.config.cf_title
  }

  returnData._status = 'OK'
  return returnData
}
