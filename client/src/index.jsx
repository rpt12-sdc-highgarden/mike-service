import React from 'react';
import ReactDOM from 'react-dom';
import Image from './image';
import Description from './description';

const flexStyle = {
  display: 'flex'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.book = {};
    this.state.weightedReviews = 0;

    this.averageReviews = this.averageReviews.bind(this);
    this.calculateBarWidth = this.calculateBarWidth.bind(this);
  }

  componentDidMount() {
    const bookId = window.location.pathname.split('/')[1] || 0;

    fetch(`http://18.188.156.228:3004/books/${bookId}`)
      .then((response) => {
        return response.json();
      })
      .then((book) => {
        const date = new Date(book.publishDate);
        const month = date.toLocaleString('en-us', { month: 'long' });
        const day = date.toLocaleString('en-us', { day: 'numeric' });
        const year = date.toLocaleDateString('en-us', { year: 'numeric' });
        const publishDate = month + ' ' + day + 'th ' + year;
        const ratings = {
          five: book.five,
          four: book.four,
          three: book.three,
          two: book.two,
          one: book.one
        };
        const links = {
          kindle: book.kindle,
          amazon: book.amazon,
          stores: {
            audible: book.audible,
            barnesAndNoble: book.barnesAndNoble,
            walmart: book.walmart,
            apple: book.apple,
            google: book.google,
            abebooks: book.abebooks,
            bookDesository: book.bookDesository,
            indigo: book.indigo,
            alibris: book.alibris,
            betterWorldBooks: book.betterWorldBooks,
            indieBound: book.indieBound
          },
          worldcat: book.worldcat
        };
        const metadata = {
          originalTitle: book.originalTitle,
          isbn: book.isbn,
          isbn13: book.isbn13,
          language: book.book_language
        };
        this.setState({
          book: book,
          weightedReviews: this.averageReviews({...ratings}),
          publishDate: publishDate,
          reviewPercents: this.calculateBarWidth({...ratings}),
          links,
          metadata,
          ratings
        });
      });

  }

  averageReviews(total) {
    const totalReviewValue = (total.five * 5) + (total.four * 4) + (total.three * 3) + (total.two * 2) + (total.one * 1);
    const totalReviews = (total.five + total.four + total.three + total.two + total.one);
    return (totalReviewValue / totalReviews);
  }

  calculateBarWidth(r) {
    const reviews = {...r};
    let topReview = '';
    let topReviewNumber = 0;

    // loop through each review type
    for (let key in reviews) {
      // check for greatest value of reviews
      if (reviews[key] > topReviewNumber) {
        topReviewNumber = reviews[key];
        topReview = key;
      }
    }

    // object for state set
    let reviewPercents = {};

    // 2nd loop - reset new objects to percentages for eventual state set
    for (let key in reviews) {
      if (key === topReview) {
        reviewPercents[key] = '100%';
      } else {
        reviewPercents[key] = parseInt(((reviews[key] / reviews[topReview]) * 100)) + '%';
      }
    }

    return reviewPercents;
  }

  render() {
    return (
      <div style={flexStyle}>
        <Image image={this.state.book.image_url} />
        <Description
          title={this.state.book.title}
          description={this.state.book.book_description}
          author={this.state.book.author}
          ratings={{...this.state.ratings}}
          reviews={this.state.book.reviews}
          weightedReviews={this.state.weightedReviews}
          links={{...this.state.links}}
          pages={this.state.book.pages}
          publishDate={this.state.publishDate}
          publisher={this.state.book.publisher}
          metadata={{...this.state.metadata}}
          reviewPercents={{...this.state.reviewPercents}}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  // eslint-disable-next-line no-undef
  document.getElementById('description-app')
);