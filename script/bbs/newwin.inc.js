const commonLib = require('../lib/common.lib')

module.exports = async function newWinIncRun(req, res, data = {}) {
  let returnData = {}

  returnData.result = await global.knex.select('*')
    .from(data.common.g5.new_win_table)
    .whereRaw("? between nw_begin_time and nw_end_time", req.userData.timeYMDHIS)
    .andWhere('nw_device', 'in', ['both', 'pc'])
    .orderBy('nw_id')
  returnData.cookie = req.cookie

  let i = 0
  returnData.content = []
  returnData.isCookieSet = []
  returnData.result.forEach((nw) => {
    if(req.cookies['hd_pops_' + nw.nw_id]) returnData.isCookieSet[i] = true
    else {
      returnData.isCookieSet[i] = false
      returnData.content[i] = commonLib.convContent(nw.nw_content, 1)
    }

    i++
  })

  returnData._status = 'OK'
  return returnData
}
