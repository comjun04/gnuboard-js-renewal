const head = require('./head')
const common = require('./_common')

module.exports = async function indexRun(req, res, data = {}) {
  let returnData = {data: {}}

  returnData.data.common = await common(req, res)

  // 테마 확인

  // 모바일인지 확인
  
  returnData.data.head = head(req, res, {config: returnData.data.common.config})

  returnData._status = 'OK'
  return returnData
}
