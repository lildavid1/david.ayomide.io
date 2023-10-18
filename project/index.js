import { connect } from '@planetscale/database'

const config = {
  host: '<host>',
  username: '<user>',
  password: '<password>'
}

const conn = connect(config)
const results = await conn.execute('select 1 from dual where 1=?', [1])
console.log(results)
