const head = require('./head')
const common = require('./_common')

module.exports = function indexRun(req, res) {
  let returnData = {data: {}}

  returnData.data.common = common(req, res)

  // 테마 확인

  // 모바일인지 확인
  
  returnData.data.head = head(req, res)

  returnData._status = 'OK'
  return returnData
}
