const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/books', { useNewUrlParser: true, useCreateIndex: true });

const bookSchema = mongoose.Schema({
  id: {
    type: Number,
    index: true,
    unique: true,
  },
  title: String,
  author: String,
  description: String,
  image: String,
  ratings: {
    five: Number,
    four: Number,
    three: Number,
    two: Number,
    one: Number,
  },
  reviews: Number,
  links: {
    kindle: String,
    amazon: String,
    stores: {
      audible: String,
      barnesAndNoble: String,
      walmart: String,
      apple: String,
      google: String,
      abebooks: String,
      bookDesository: String,
      indigo: String,
      alibris: String,
      betterWorldBooks: String,
      indieBound: String,
    }
  },
  type: String,
  pages: Number,
  publishDate: Date,
  publisher: String,
  metadata: {
    originalTitle: String,
    isbn: Number,
    isbn13: Number,
    language: String,
    series: {
      name: String,
      url: String,
    },
  },
});

const Book = mongoose.model('Book', bookSchema);

const retrieve = (id, callback) => {
  Book.findOne({ id }, (err, doc) => {
    callback(err, doc);
  });
};

const save = (book) => {
  const doc = new Book(book);
  doc.save()
    .catch(err => {
      console.log(err);
    });
};

const update = (update) => {
  Book.findOneAndUpdate({ id: update.id }, update, () => console.log(`Updated document ${update.id}`));
};

const remove = (del) => {
  Book.findOneAndDelete({ id: del.id }, del, () => console.log(`Removed document ${del.id}`));
};

module.exports = {
  bookSchema,
  Book,
  retrieve,
  save,
  update,
  remove
};
