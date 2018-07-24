import * as React from 'react'
import { Link } from 'react-router-dom';

import { editBook } from '../api/fetchingAPI';

import './editBook.css';

interface IEditBookProp {
   location: {
      state: {
         book: {
            book_author: string;
            book_title: string;
            chapter_end: number;
            chapter_start: number;
            id: number | string;
            image_src: string;
            url: string;
         }
      }
   },
   history: any;
}

export class EditBook extends React.Component<IEditBookProp, {}> {
   constructor(props: IEditBookProp) {
      super(props);
   }

   public handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const author = e.currentTarget.edit_author.value.trim();
      const title = e.currentTarget.edit_title.value.trim();
      const start = e.currentTarget.edit_ch_start.value;
      const end = e.currentTarget.edit_ch_end.value;
      const imgSrc = e.currentTarget.edit_img_url.value.trim();
      const url = e.currentTarget.edit_book_url.value.trim();
      const digit = String(url).match(/\d{1,2}(?=\.md)/i)![0].length;

      // tslint:disable-next-line:no-console
      // console.log(author, title, start, end, imgSrc, digit, url);
      editBook(author, title, digit, start, end, this.props.location.state.book.id, imgSrc, url);
      this.props.history.push('/');
   }

   public render () {
      // tslint:disable-next-line:no-console
      // console.log(this.props.location.state)
      const {book_author, book_title, chapter_end, chapter_start, image_src, url} = this.props.location.state.book;
      return (
         <div className='editBook__main'>
         <h1 className='editBook__mainTitle'>Edit Book Detail</h1>
         <h2 className='editBook__title'>{book_title}</h2>
            <form className='editBook__form' onSubmit={this.handleSubmit}>
               <label htmlFor='editBook__input--bookAuthor'>Book Author:</label>
               <input name='edit_author' type='text' defaultValue={book_author} required={true} id='editBook__input--bookAuthor' />

               <label htmlFor='editBook__input--bookTitle'>Book Title:</label>
               <input name='edit_title' type='text' defaultValue={book_title} required={true} id='editBook__input--bookTitle' />

               <label htmlFor='editBook__input--chapterStart'>Chapter Start:</label>
               <input name='edit_ch_start' type='number' min='0' defaultValue={String(chapter_start)} required={true} id='editBook__input--chapterStart' />

               <label htmlFor='editBook__input--chapterEnd'>Chapter End:</label>
               <input name='edit_ch_end' type='number' min='1' defaultValue={String(chapter_end)} required={true} id='editBook__input--chapterEnd' />

               <label htmlFor='editBook__input--imageURL'>Book Cover Source:</label>
               <input name='edit_img_url' type='text' defaultValue={image_src} required={true} id='editBook__input--imageURL' />

               <label htmlFor='editBook__input--bookURL'>Raw Markdown URL:
                  <p style={{ fontSize: '0.75em'}}>ie: https://raw.githubusercontent.com/manuscript/ch1.md</p>
               </label>
               <input name='edit_book_url' type='url' defaultValue={url} required={true} id='editBook__input--bookURL' />

               <Link to='/'>
               <button className='addBook__button--cancel'>Cancel</button>
               </Link>
               <button type='submit' className='addBook__button--submit' >Submit</button>
            </form>
         </div>
      );
   }
}