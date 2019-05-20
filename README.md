# Project Name

> The description and metadata module for Goodreads books. Contains a lot of book info, as well as a few interactive elements (ratings, wishlist dropdown)

## Related Projects

  - https://github.com/rpt12-sdc-highgarden/aarushi-service
  - https://github.com/rpt12-sdc-highgarden/alyssa-service
  - https://github.com/rpt12-sdc-highgarden/anait-service

## Table of Contents

1. [Usage](#Usage)
2. [Custom Config](#custom%20config) - essential to getting the service running
3. [Requirements](#requirements)
4. [API Endpoint](#api%20endpoint)

## Usage

> For setup, please follow this pattern:

1. `npm install`
2. `npm run seed` - runs seeding script
3. `npm run build` - compiles webpack into `bundle.js`
4. `npm start`
5. Navigate to [localhost:3004](http://localhost:3004)

## Custom Config

> A couple elements are still hardcoded into the service, given time constraints during FEC. Two things to watch out for are:

1. Image load - currently, in `image.jsx`, the image files are hardcoded to reference an S3 folder.
2. Fetch book - in `index.jsx`, the book info is currently hardcoded as a `fetch` to the AWS service that was previously running

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.15.3

## API Endpoints

### GET /books/:id

Description: Retrieves the book with the provided ID from the database
Response:
```
{
  _id: unique key,
  title: string,
  author: array,
  description: string,
  ratings: {
    five: number,
    four: number,
    three: number,
    two: number,
    one: number
  },
  reviews: number,
  links: {
    kindle: string,
    amazon: string,
    stores: {
      audible: string,
      barnesAndNoble: string,
      walmart: string,
      apple: string,
      google: string,
      abebooks: string,
      bookDesository: string,
      indigo: string,
      alibris: string,
      betterWorldBooks: string,
      indieBound: string
    }
    worldcat: string
  },
  type: string,
  pages: number,
  publishDate: date,
  publisher: string,
  metadata: {
    originalTitle: string,
    isbn: number,
    isbn13: number,
    asin: string,
    language: string,
    series: {
      name: string,
      url: string
    }
  }
}
```

### POST /add

Description: Adds a book to the database
Response:
```
Status 201: "Saved!"
```

### PUT /update

Description: Updates a book in the database
Response:
```
Status 200: "Updated document 101"
```

### DELETE /remove

Description: Removes a book in the database
Response:
```
Status 200: "Removed document 101"
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

