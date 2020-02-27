// 현재 접속자수 출력
exports.connect = async function connect(g5, config, skinDir = 'basic') {
  let row = await global.knex.sum({mb_cnt: global.knex.raw("if(mb_id <> '',1,0)")})
    .count({total_cnt: '*'})
    .from(g5.login_table)
    .where('mb_id', '<>', config.cf_admin)
}
