const headSub = require('./head.sub')

module.exports = function headRun(req, res) {
  let returnData = {data: {}}

  //run_event('pre_head');

  // 테마 확인

  // 모바일인지 확인

  // 필요한 라이브러리 로드
  returnData.data.headSub = headSub(req, res)

  returnData._status = 'OK'
  return returnData
}
