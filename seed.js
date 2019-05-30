const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const fake = require('faker');

const genNumber = (num) => {
  if (num < 200) {
    return num;
  } else {
    return fake.random.number({ min: 0, max: 199 });
  }
};

let count = 1;
const seed = () => {
  let queries = [];
  for (let i = 0; i < 100000; i += 1) {
    let book = {};

    // initiate a bunch of new book info
    book.id = count;
    book.title = fake.random.words(3);
    book.author = fake.name.findName();
    book.description = fake.lorem.paragraphs();
    book.ratings = {
      five: fake.random.number(),
      four: fake.random.number(),
      three: fake.random.number(),
      two: fake.random.number(),
      one: fake.random.number(),
    };
    book.reviews = fake.random.number();
    book.links = {
      kindle: fake.internet.url(),
      amazon: fake.internet.url(),
      stores: {
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
      },
    };
    book.type = fake.random.word();
    book.pages = fake.random.number({ max: 3000 });
    book.publishDate = fake.date.past();
    book.publisher = fake.company.companyName();
    book.metadata = {
      originalTitle: book.title,
      isbn: fake.random.number(),
      isbn13: fake.random.number(),
      language: 'English',
    };
    book.image = `https://s3.us-east-2.amazonaws.com/highgarden-sdc-goodreads/book-images/${genNumber(count)}.jpg`;

    if (count % 2 === 0) {
      book.metadata.series = {
        name: fake.random.words(2),
        url: fake.internet.url(),
      };
    }

    queries.push(book);
    count++;
  }
  return queries;
};

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;
  const dbo = db.db('books');


  dbo.collection('books').drop((err) => {
    if (err) console.log(err);

    dbo.createCollection('books', async (err) => {
      if (err) throw err;
      console.log('Seeding began at:', Date(Date.now()));
      for (let i = 0; i < 100; i++) {

        await dbo.collection('books').insertMany(seed());

      }
      console.log('Seeding ended at:', Date(Date.now()));
      process.exit(0);

    });
  });
});
