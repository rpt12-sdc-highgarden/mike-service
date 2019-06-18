const Faker = require('faker');

const genNumber = (num) => {
  if (num < 200) {
    return num;
  } else {
    return fake.random.number({ min: 0, max: 199 });
  }
};

const generateRandomData = (userContext, events, done) => {
  const id = Faker.random.number({min: 0, max: 10000000});
  const bookTitle = Faker.random.words(3);
  const title = bookTitle;
  const author = Faker.name.findName();
  const book_description = Faker.lorem.paragraphs();
  const image_url = `https://s3.us-east-2.amazonaws.com/highgarden-sdc-goodreads/book-images/${genNumber(id)}.jpg`;
  const five = Faker.random.number();
  const four = Faker.random.number();
  const three = Faker.random.number();
  const two = Faker.random.number();
  const one = Faker.random.number();
  const reviews = Faker.random.number();
  const kindle = Faker.internet.url();
  const amazon = Faker.internet.url();
  const audible = Faker.internet.url();
  const barnesAndNoble = Faker.internet.url();
  const walmart = Faker.internet.url();
  const apple = Faker.internet.url();
  const google = Faker.internet.url();
  const abebooks = Faker.internet.url();
  const bookDesository = Faker.internet.url();
  const indigo = Faker.internet.url();
  const alibris = Faker.internet.url();
  const betterWorldBooks = Faker.internet.url();
  const indieBound = Faker.internet.url();
  const worldcat = Faker.internet.url();
  const book_type = Faker.random.word();
  const pages = Faker.random.number({ max: 3000 });
  const publishDate = Faker.date.past();
  const publisher = Faker.company.companyName();
  const originalTitle = bookTitle;
  const isbn = Faker.random.number();
  const isbn13 = Faker.random.number();
  const book_language = 'English';

  if (id % 2 === 0) {
    series_name = Faker.random.words(2);
    series_url = Faker.internet.url();
  } else {
    series_name = null;
    series_url = null;
  }

  userContext.vars.id = id;
  userContext.vars.bookTitle = bookTitle;
  userContext.vars.title = title;
  userContext.vars.author = author;
  userContext.vars.book_description = book_description;
  userContext.vars.image_url = image_url;
  userContext.vars.five = five;
  userContext.vars.four = four;
  userContext.vars.three = three;
  userContext.vars.two = two;
  userContext.vars.one = one;
  userContext.vars.reviews = reviews;
  userContext.vars.kindle = kindle;
  userContext.vars.amazon = amazon;
  userContext.vars.audible = audible;
  userContext.vars.barnesAndNoble = barnesAndNoble;
  userContext.vars.walmart = walmart;
  userContext.vars.apple = apple;
  userContext.vars.google = google;
  userContext.vars.abebooks = abebooks;
  userContext.vars.bookDesository = bookDesository;
  userContext.vars.indigo = indigo;
  userContext.vars.alibris = alibris;
  userContext.vars.betterWorldBooks = betterWorldBooks;
  userContext.vars.indieBound = indieBound;
  userContext.vars.worldcat = worldcat;
  userContext.vars.book_type = book_type;
  userContext.vars.pages = pages;
  userContext.vars.publishDate = publishDate;
  userContext.vars.publisher = publisher;
  userContext.vars.originalTitle = originalTitle;
  userContext.vars.isbn = isbn;
  userContext.vars.isbn13 = isbn13;
  userContext.vars.book_language = book_language;
  userContext.vars.series_name = series_name;
  userContext.vars.series_url = series_url;
  return done();
}

module.exports = generateRandomData;