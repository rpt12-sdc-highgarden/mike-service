CREATE DATABASE books;

USE books;

CREATE TABLE book (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  book_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  five INTEGER NOT NULL,
  four INTEGER NOT NULL,
  three INTEGER NOT NULL,
  two INTEGER NOT NULL,
  one INTEGER NOT NULL,
  reviews INTEGER NOT NULL,
  kindle TEXT NOT NULL,
  amazon TEXT NOT NULL,
  audible TEXT NOT NULL,
  barnesAndNoble TEXT NOT NULL,
  walmart TEXT NOT NULL,
  apple TEXT NOT NULL,
  google TEXT NOT NULL,
  abebooks TEXT NOT NULL,
  bookDesository TEXT NOT NULL,
  indigo TEXT NOT NULL,
  alibris TEXT NOT NULL,
  betterWorldBooks TEXT NOT NULL,
  indieBound TEXT NOT NULL,
  worldcat TEXT NOT NULL,
  book_type TEXT NOT NULL,
  pages INTEGER NOT NULL,
  publishDate DATE NOT NULL,
  publisher TEXT NOT NULL,
  originalTitle TEXT NOT NULL,
  isbn INTEGER NOT NULL,
  isbn13 INTEGER NOT NULL,
  asin TEXT NOT NULL,
  book_language TEXT NOT NULL,
  series_name TEXT NOT NULL,
  series_url TEXT NOT NULL
);


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/
