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

  try {
    const results = await connection.execute("SELECT * FROM registrants");
    console.log(results);
  } catch (error) {
    console.error('Error executing the query:', error);
  } finally {
    connection.end(); // Always close the connection
  }
}

runQuery();
