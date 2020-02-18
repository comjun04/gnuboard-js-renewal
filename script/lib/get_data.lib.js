exports.getConfig = async (req) => {
  // No cache system

  let sql = await global.knex.select('*').from(req.userData.dbconfig.config_table)
  return sql[0]
}
