const planetscale = require('@planetscale/database');

const connection = planetscale.createConnection({
  host: 'your-database-host', // e.g., aws.connect.psdb.cloud
  user: 'your-database-username', // e.g., wtb3duvh5dy4n67qrr48
  password: 'your-database-password', // e.g., your-password
});

