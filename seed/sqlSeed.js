const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_USER || '',
  database: 'books'
});
const fake = require('faker');

const genNumber = (num) => {
  if (num < 200) {
    return num;
  } else {
    return fake.random.number({ min: 0, max: 199 });
  }
};

let count = 0;
const newBook = () => {
  let queries = [];
  for (let i = 0; i < 1000; i += 1) {
    // initiate a bunch of new book info
    let bookTitle = fake.random.words(3);
    let book = {
      id: count,
      title: bookTitle,
      author: fake.name.findName(),
      book_description: fake.lorem.paragraphs(),
      image_url: `https://s3.us-east-2.amazonaws.com/highgarden-sdc-goodreads/book-images/${genNumber(count)}.jpg`,
      five: fake.random.number(),
      four: fake.random.number(),
      three: fake.random.number(),
      two: fake.random.number(),
      one: fake.random.number(),
      reviews: fake.random.number(),
      kindle: fake.internet.url(),
      amazon: fake.internet.url(),
      audible: fake.internet.url(),
      barnesAndNoble: fake.internet.url(),
      walmart: fake.internet.url(),
      apple: fake.internet.url(),
      google: fake.internet.url(),
      abebooks: fake.internet.url(),
      bookDesository: fake.internet.url(),
      indigo: fake.internet.url(),
      alibris: fake.internet.url(),
      betterWorldBooks: fake.internet.url(),
      indieBound: fake.internet.url(),
      worldcat: fake.internet.url(),
      book_type: fake.random.word(),
      pages: fake.random.number({ max: 3000 }),
      publishDate: fake.date.past(),
      publisher: fake.company.companyName(),
      originalTitle: bookTitle,
      isbn: fake.random.number(),
      isbn13: fake.random.number(),
      book_language: 'English',
    };

    if (count % 2 === 0) {
      book.series_name = fake.random.words(2);
      book.series_url = fake.internet.url();
    } else {
      book.series_name = null;
      book.series_url = null;
    }

    queries.push(book);
    count++;
  }
  return queries;
};

const seed = async () => {
  console.log('Seeding began at:', Date(Date.now()));
  for (let i = 0; i < 10000; i++) {
    let bookArr = newBook(); // array of x book objects
    let keys = Object.keys(bookArr[1]);
    let valsArr = [];
    for (var bookObj = 0; bookObj < bookArr.length; bookObj++) {
      let valString = '(';
      keys.forEach(key => {
        valString += `"${bookArr[bookObj][key]}", `;
      });
      valString = valString.slice(0, -2);
      valsArr.push(valString);
    }

    valsArr = `${valsArr.join('),')})`;

    await new Promise((resolve, reject) => {
      dbConnection.query(
        `INSERT INTO book VALUES ${valsArr}`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
        );
    });
  }
  console.log('Seeding ended at:', Date(Date.now()));
  process.exit(0);
}

dbConnection.connect((err) => {
  if (err) {
    console.log('error:', err);
  } else {
    seed();
  }
});
