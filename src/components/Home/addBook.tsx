import * as React from 'react';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import { addBook } from '../api/fetchingAPI';

import './home.css';

interface IAddBookProp {
   history: any;
}

export class AddBook extends React.Component<IAddBookProp, {}> {
   constructor(props: IAddBookProp) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const author = e.currentTarget.book_author.value.trim();
      const title = e.currentTarget.book_title.value.trim();
      const start = e.currentTarget.ch_start.value;
      const end = e.currentTarget.ch_end.value;
      const id = uuidv4();
      const imgSrc = e.currentTarget.img_url.value.trim();
      const url = e.currentTarget.book_url.value.trim();
      const digit = String(url).match(/\d{1,2}(?=\.md)/i)![0].length;

      // tslint:disable-next-line:no-console
      // console.log(author, title, start, end, id, imgSrc, url, digit);
      addBook(author, title, digit, start, end, id, imgSrc, url);
      this.props.history.push('/');
   }

   public render() {
      // tslint:disable-next-line:no-console
      return (
         <div className='addBook__main'>
         <h2 className='addBook__title'>Add New Book</h2>
            <form className='addBook__form' onSubmit={this.handleSubmit}>
               <label htmlFor='bookAuthor'>Book Author:</label>
               <input name='book_author' type='text' placeholder='Book Author' required={true} id='addBook__input--bookAuthor' />

               <label htmlFor='bookTitle'>Book Title:</label>
               <input name='book_title' type='text' placeholder='Book Title' required={true} id='addBook__input--bookTitle' />

               <label htmlFor='chapterStart'>Chapter Start:</label>
               <input name='ch_start' type='number' min='0' placeholder='Chapter Start' required={true} id='addBook__input--chapterStart' />

               <label htmlFor='chapterEnd'>Chapter End:</label>
               <input name='ch_end' type='number' min='1' placeholder='Chapter End' required={true} id='addBook__input--chapterEnd' />

               <label htmlFor='imageURL'>Book Cover Source:</label>
               <input name='img_url' type='text' placeholder='https://wikimedia.org' required={true} id='addBook__input--imageURL' />

               <label htmlFor='bookURL'>Raw Markdown URL:
                  <p style={{ fontSize: '0.75em'}}>ie: https://raw.githubusercontent.com/manuscript/ch1.md</p>
               </label>
               <input name='book_url' type='url' placeholder='https://raw.githubusercontent.com/getify/Functional-Light-JS/master/manuscript/ch1.md' required={true} id='addBook__input--bookURL' />

               <Link to='/'>
               <button className='addBook__button--cancel'>Cancel</button>
               </Link>
               <button type='submit' className='addBook__button--submit' >Submit</button>
            </form>
         </div>
      );
   }
}