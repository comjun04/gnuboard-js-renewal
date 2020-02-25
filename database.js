const knex = require('knex')
const fs = require('fs')

let file = 'data/dbconfig.js'
let dbconfig = fs.existsSync(__dirname + '/' + file) ? require('./' + file)() : {} // this file can reload

exports.create = (host, user, pass, db) => {
  return knex({
    client: 'mysql',
    connection: {
      host: host || dbconfig.host,
      user: user || dbconfig.user,
      password: pass || dbconfig.password,
      database: db || dbconfig.db
    },
    debug: true,
    asyncStackTraces: true // debug
  })
}

exports.connectionTest = async (instance) => {
  try {
    await instance.raw('select 1+1 as test')
    return true
  } catch(err) {
    throw err
  }
}

/*
function reload() {
  delete require.cache[require.resolve('./dbconfig')]
  dbconfig = require('./dbconfig')
  return create()
}
*/

