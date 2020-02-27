const fs = require('fs')
const path = require('path').resolve()

// 현재 접속자수 출력
exports.connect = async function connect(g5, config, sharedData, skinDir = 'basic') {
  let row = await global.knex.sum({ mb_cnt: global.knex.raw("if(mb_id <> '',1,0)") })
    .count({ total_cnt: '*' })
    .from(g5.login_table)
    .where('mb_id', '<>', config.cf_admin)

  let match = skinDir.match(/^theme\/(.+)$/)
  let connectSkinPath = ''
  let connectSkinURL = ''
  if (match) {
    if (sharedData.isMobile) {
      connectSkinPath = sharedData.themeMobilePath
        + '/' + sharedData.skinDir + '/connect/' + match[1]
        if(!fs.lstatSync(path + '/' + connectSkinPath).isDirectory()) {
          connectSkinPath = sharedData.themePath + '/' + sharedData.skinDir + '/connect/' + match[1]
          
        }
    }
  }
}
