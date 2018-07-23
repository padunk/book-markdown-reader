import * as React from 'react';
import { Link } from 'react-router-dom';

// import { URL_LIST } from '../api/urlList';
import { fetchBooks } from '../api/fetchingAPI';

import './home.css';

interface ILists {
    book_author: string;
    book_title: string;
    chapter_digit: number;
    chapter_end: number;
    chapter_start: number;
    id: number;
    image_src: string,
    url: string;
};

interface IBookListState {
    lists: ILists[];
};

export class BookList extends React.Component<{}, IBookListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            lists: [],
        }
    }

    public componentDidMount() {
        fetchBooks().then(data => this.setState({ lists: data }));
    }

    public render () {
        return (
            <div className='home__main'>
                <h3 className='home__title'>List of Free Books</h3>
                <ol className='home__ul'>
                {this.state.lists.map((list, idx) => {
                    return (
                        <li key={list.id + idx} className='home__list'>
                            <div className='home__list--imageDiv'>
                            <Link 
                                to={{
                                    pathname: `/book/${list.book_title}`,
                                    state: {
                                        book_title: list.book_title,
                                        ch_digit: list.chapter_digit,
                                        ch_end: list.chapter_end,
                                        ch_start: list.chapter_start,
                                        url: list.url,
                                    }
                                }} >
                                    <img src={list.image_src} alt={list.book_title} className='home__list--image' />
                                </Link>
                            </div>
                            <div className='home__list--body'>
                                <h4 className='home__list--bookTitle'>{list.book_title}</h4>
                                <p className='home__list--bookAuthor'>{list.book_author}</p>
                            </div>
                        </li>
                    );
                })}
                </ol>
            </div>
        );
    }
}