const planetscale = require('@planetscale/database');

console.log(planetscale)
planetscale.connect({
  host: 'aws.connect.psdb.cloud',
  username: 'wtb3duvh5dy4n67qrr48',
  password: 'pscale_pw_UoxvB9rrC1LgHXZjDmgDzCYdO7n4SSgPvBewd78PNDv'
});

const results =  planetscale.execute('select 1 from dual where 1=?', [1])
console.log(results)

async function tryko(){
  console.log(await planetscale)
}