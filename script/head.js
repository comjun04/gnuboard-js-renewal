const headSub = require('./head.sub')
const newWinInc = require('./bbs/newwin.inc')
const connectLib = require('./lib/connect.lib')

module.exports = async function headRun(req, res, data = {}) {
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

  // Line 27
  returnData.title = data.common.g5.title

  // Line 31
  if(req.userData._index) { // index에서만 실행
    returnData._data.newWinInc = await newWinInc(req, res, {common: data.common})
  }

  // Line 41
  returnData.connect = await connectLib.connect(data.common.g5, data.common.config)

  returnData._status = 'OK'
  return returnData
}
