exports.getConfig = async (req, res, data = {}) => {
  // No cache system

  let sql = await global.knex.select('*').from(data.common.g5.config_table)
  return sql[0]
}
