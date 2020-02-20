const headSub = require('./head.sub')

module.exports = function headRun(req, res, data = {}) {
  let returnData = {_data: {}}

  // Line 4
  //run_event('pre_head');

  // Line 6
  // TODO 테마 확인

  // Line 11
  // TODO 모바일인지 확인

  // Line 16
  // 필요한 라이브러리 로드
  returnData._data.headSub = headSub(req, res, {
    common: data.common
  })

  returnData._status = 'OK'
  return returnData
}
