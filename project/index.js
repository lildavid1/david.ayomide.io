// const planetscale = require('@planetscale/database');

// const connection = planetscale.connect({
//   host: 'aws.connect.psdb.cloud',
//   user: 'bysidvltse7rfxg9yq2f',
//   password: 'pscale_pw_ykn7ikOpzq3bcTFbe8awBu3AI48vXjZewJ9gVkS3mEo',
//   database: 'adebayo-shopping'
// });

// console.log(connection.execute("SELECT * FROM registrants"))

const planetscale = require('@planetscale/database');

async function runQuery() {
  const connection = planetscale.connect({
    host: 'aws.connect.psdb.cloud',
    user: 'bysidvltse7rfxg9yq2f',
    password: 'pscale_pw_ykn7ikOpzq3bcTFbe8awBu3AI48vXjZewJ9gVkS3mEo',
    database: 'adebayo-shopping'
  });
  // console.log(connection.execute("SELECT count(*) FROM registrants"))
  console.log(connection.execute())
};

runQuery();
