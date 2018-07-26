import * as React from 'react';
import { Link } from 'react-router-dom';

import { DELETE_BOOK } from '../api/fetchingAPI';

import './deleteBook.css';

interface IDeleteBookProp {
   location: {
      state: {
         book: {
            book_author: string;
            book_title: string;
            id: string | number;
         }
      }
   },
   history : any;
}

export class DeleteBook extends React.Component<IDeleteBookProp, {}> {
   
   public deleteBook = () => {
      DELETE_BOOK(this.props.location.state.book.id);
      this.props.history.push('/');
   }

   public render () {
      return (
         <div className='deleteBook__main'>
            <h2 className='deleteBook__main--title'>DANGER ZONE!</h2>
            <h3>Warning: This Process Can Not Be Undo</h3>
            <fieldset>
               <strong>Are You Sure To DELETE This Book from shelves?</strong>
               <p>Book Title: <span className='deleteBook__bookTitle'>{this.props.location.state.book.book_title}</span></p>
               <p>Author: <span className='deleteBook__bookAuthor'>{this.props.location.state.book.book_author}</span></p>
            </fieldset>
            <button className='deleteBook__button--submit' onClick={this.deleteBook}>Delete</button>
            <Link to='/'><button className='deleteBook__button--cancel'>CANCEL</button></Link>
         </div>
      );
   }
}