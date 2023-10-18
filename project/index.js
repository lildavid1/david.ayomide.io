const planetscale = require('@planetscale/database');

// Define your database connection settings
// const connection = planetscale.createConnection({
//   host: 'aws.connect.psdb.cloud',
//   user: 'your-mysql-username',
//   password: 'your-mysql-password',
//   database: 'your-mysql-database',
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');

//   // Perform a query
//   connection.query('SELECT * FROM your_table', (queryError, results) => {
//     if (queryError) {
//       console.error('Error executing the query:', queryError);
//     } else {
//       console.log('Query results:', results);
//     }

//     // Close the connection
//     connection.end();
//   });
// });
console.log(planetscale.connect())