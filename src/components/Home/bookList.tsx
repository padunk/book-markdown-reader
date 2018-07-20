import * as React from 'react';
import { Link } from 'react-router-dom';

import { URL_LIST } from '../api/urlList';

interface ILists {
    book_author: string;
    book_title: string;
    chapter_digit: number;
    chapter_end: number;
    chapter_start: number;
    id: number;
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
        this.setState({ lists: URL_LIST });
    }

    public render () {
        return (
            <div>
                <h3>List of Free Books</h3>
                <ul>
                {this.state.lists.map((list, idx) => {
                    return (
                        <li key={list.id + idx}>
                            <Link 
                                to={{
                                    pathname: `/booklist/${list.book_title}`,
                                    state: {
                                        book_title: list.book_title,
                                        ch_digit: list.chapter_digit,
                                        ch_end: list.chapter_end,
                                        ch_start: list.chapter_start,
                                        url: list.url,
                                    }
                                }} >
                                    {`${list.book_title} by ${list.book_author}`}
                            </Link>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}