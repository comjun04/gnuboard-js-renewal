const head = require('./head')
const common = require('./_common')

module.exports = async function indexRun(req, res, data = {}) {
  let returnData = {_data: {}}

  returnData._data.common = await common(req, res)

  // Line 6
  // TODO 테마 확인

  // Line 11
  // TODO 모바일인지 확인
  
  returnData._data.head = head(req, res, {
    common: returnData._data.common
  })

  returnData._status = 'OK'
  return returnData
}
