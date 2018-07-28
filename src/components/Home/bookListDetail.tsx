import * as React from 'react';
import { Link } from 'react-router-dom';

import { CHAPTER_REGEX } from '../utils/helper';

import './home.css';

interface IBookListDetailProp {
    match: {
        params: {
            detail: string;
        }
    }
    location: {
        state: {
            ch_digit: number;
            ch_end: number;
            ch_start: number;
            url: string;
        }
    }
}

interface IBookListDetailState {
    liElement: any[];
}

export class BookListDetail extends React.Component<IBookListDetailProp, IBookListDetailState> {
    
    constructor(props: IBookListDetailProp) {
        super(props);

        this.state = {
            liElement: [],
        }
    }

    public componentDidMount() {
        this.loop();
    }

    public loop() {
        const regex = CHAPTER_REGEX;
        const { ch_digit, ch_end, ch_start, url } = this.props.location.state;
        const { detail } = this.props.match.params;

        for (let i = ch_start; i <= ch_end; i++) {
            let newURL = '';
            if (ch_digit === 2 && i <= 9) {
                newURL = url.replace(regex, '0' + String(i));
            } else {
                newURL = url.replace(regex, String(i));
            }
            this.setState(prevState => ({
                liElement: prevState.liElement.concat(
                    <li key={i} className='book__list'><Link to={{ pathname: `/reader/${detail}/chapter${i}`, state: { mdURL: newURL } }}>Chapter {i}</Link></li>
                )
            }))
        }
        return undefined;
    }

    public render() {
        // tslint:disable-next-line:no-console
        return (
            <div className='book__main'>
                <h2 className='book__title'>{this.props.match.params.detail}</h2>
                <ul className='book__ul'>
                    {this.state.liElement !== [] 
                    ? this.state.liElement.map(el => {
                        return el;
                    })
                    : <div>Loading...</div>
                    }
                </ul>
            </div>
        );
    }
}