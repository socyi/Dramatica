const mysql = require('mysql');

// Create the connection to the MySQL database
const db = mysql.createConnection({
    host: 'conn1',
    user: 'root',
    password: 'root',
    database: 'dramaticadb',
    port: 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    // Test by running a simple query
    db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is:', results[0].solution); // Should output: The solution is: 2

        // Close the connection
        db.end((err) => {
            if (err) {
                console.error('Error closing the connection:', err);
                return;
            }
            console.log('Connection closed');
        });
    });
});
