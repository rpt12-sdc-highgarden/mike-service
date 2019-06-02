const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_USER || '',
  database: 'books'
});

dbConnection.connect((err) => {
  if (err) {
    console.log('error:', err);
  } else {
    console.log(`Connected to the database`)
  }
});

const retrieve = (id, callback) => {
  dbConnection.query(
    `SELECT * FROM book WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        console.log('error:', err);
      }
      callback(err, result);
    }
  );
};

const save = (book) => {
  const keys = Object.keys(book);
  let valString = '';
  keys.forEach(key => valString += `"${book[key]}", `);
  valString = valString.slice(0, -2);

  dbConnection.query(
    `INSERT INTO book VALUES (${valString})`,
    (err) => {
      console.log('error:', err);
    }
  );
};

const update = (update) => {
  const keys = Object.keys(update);
  let valString = '';
  keys.forEach(key => valString += `${key} = "${update[key]}", `);
  valString = valString.slice(0, -2);

  dbConnection.query(
    `UPDATE book SET ${valString} WHERE id = ${update[id]}`,
    (err) => {
      if (err) {
        console.log('error:', err);
      } else {
      console.log(`Updated document ${update[id]}`);
      }
    }
  );
};

const remove = (del) => {
  dbConnection.query(
    `DELETE FROM book WHERE id = ${del.id}`,
    (err) => {
      if (err) {
        console.log('error:', err);
      } else {
        console.log(`Removed document ${del.id}`);
      }
    }
  )
};

module.exports = {
  dbConnection,
  retrieve,
  save,
  update,
  remove
};
