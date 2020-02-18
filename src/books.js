const clone = require('clone');

let db = {};

const defaultData = {
   "1": {
      book_author: 'Kyle Simpson',
      book_title: 'Functional-Light JavaScript',
      chapter_digit: 1,
      chapter_end: 11,
      chapter_start: 1,
      deleted: false,
      id: 1,
      image_src: 'https://images-na.ssl-images-amazon.com/images/I/41de4aNCSQL.jpg',
      url: 'https://raw.githubusercontent.com/getify/Functional-Light-JS/master/manuscript/ch1.md',
   },
   "2": {
      book_author: 'Baptiste Pesquet',
      book_title: 'The JavaScript Way',
      chapter_digit: 2,
      chapter_end: 26,
      chapter_start: 1,
      deleted: false,
      id: 2,
      image_src: 'https://s3.amazonaws.com/titlepages.leanpub.com/thejsway/hero?1518067447',
      url: 'https://raw.githubusercontent.com/bpesquet/thejsway/master/manuscript/chapter01.md',
   },
   "3": {
      book_author: 'Brian Lonsdorf',
      book_title: "Professor Frisby's Mostly Adequate Guide to Functional Programming",
      chapter_digit: 2,
      chapter_end: 12,
      chapter_start: 1,
      deleted: false,
      id: 3,
      image_src: 'https://images.gr-assets.com/books/1437261819l/25847352.jpg',
      url: 'https://raw.githubusercontent.com/MostlyAdequate/mostly-adequate-guide/master/ch01.md',
   },
};

function getData (token) {
   let data = db[token]
   if (data == null) {
      data = db[token] = clone(defaultData)
   }
   return data;
}

function get (token, id) {
   return new Promise(res => {
      let books = getData(token)

      res(
         books[id].deleted
         ? {}
         : posts[id]
      )
   })
}

function getAll (token) {
   return new Promise(res => {
      let books = getData(token)
      let keys = Object.keys(books)
      let filteredBooks = keys.filter(key => !books[key].deleted)

      res(filteredBooks.map(key => books[key]))
   });
}

function add (token, post) {
   return new Promise( res => {
      let books = getData(token)

      books[post.id] = {
         book_author: post.author,
         book_title: post.title,
         chapter_digit: post.ch_digit,
         chapter_end: post.ch_end,
         chapter_start: post.ch_start,
         deleted: false,
         id: post.id,
         image_src: post.image_src,
         url: post.url,
      }

      res(books[post.id]);
   })
}

function edit (token, id, post) {
   return new Promise(res => {
      let books = getData(token);

      for (prop of Object.keys(post) ) {
         books[id][prop] = post[prop]
      }

      res(books[id]);
   })
}

function disable (token, id) {
   return new Promise(res => {
      let books = getData(token)
      books[id].deleted = true

      res(books[id])
   })
}

module.exports = {
   add,
   disable,
   edit,   
   get,
   getAll,
   getData,
}