// open database
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dramaticadb',
    port:3306
});

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT Title FROM works", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  function readTextFile(file)
  {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText;
                  alert(allText);
              }
          }
      }
      rawFile.send(null);
  }


// // create table
// db.transaction(function(tx) {
//     tx.executeSql('create table if not exists Car(step, make)');
// });

// // insert data
// db.transaction(function(tx) {
//     // loop through each item and insert the data, notice how we call escapeSql to prevent sql injection
//     ary.forEach(function(item) {
//         var sql = 'insert into Car(step, make) values(' + escapeSql(item[0]) + ', "' + escapeSql(item[1]) + '")';
//         tx.executeSql(sql);
//     });
// });

// var sql,
//     works = [];

// // read data from table
// db.transaction(function(tx) {
//     tx.executeSql('select * from works', [], function(tx, results) {
//         var len = results.rows.length;
//         for (var i = 0; i < len; i++) {
//             works.push({
//                 step: results.rows.item(i).step,
//                 make: results.rows.item(i).make
//             });
//         }

//         console.log(works);
//     }, null);
// });