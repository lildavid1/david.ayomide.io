const planetscale = require('@planetscale/database');

const connection = planetscale.connect({
  host: 'aws.connect.psdb.cloud', // e.g., aws.connect.psdb.cloud
  user: 'bysidvltse7rfxg9yq2f', // e.g., wtb3duvh5dy4n67qrr48
  password: 'pscale_pw_ykn7ikOpzq3bcTFbe8awBu3AI48vXjZewJ9gVkS3mEo', // e.g., your-password
});

console.log(connection.execute("SELECT * FROM registrants"))
