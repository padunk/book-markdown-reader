import * as React from 'react';
import { Link } from 'react-router-dom';

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
        const regex = /\d{1,2}(?=.md)/i;
        const { ch_digit, ch_end, ch_start, url } = this.props.location.state;

        let newURL = '';

        for (let i = ch_start; i <= ch_end; i++) {
            if (ch_digit === 2 && i < 9) {
                newURL = url.replace(regex, '0' + String(i));
            } else {
                newURL = url.replace(regex, String(i));
            }
            this.setState(prevState => ({
                liElement: prevState.liElement.concat(<li key={i}><Link to={{ pathname: '/reader/', state: { mdURL: newURL } }}>Chapter {i}</Link></li>)
            }))
        }
        return undefined;
    }

    public render() {
        // tslint:disable-next-line:no-console
        return (
            <div>
                <h2>{this.props.match.params.detail}</h2>
                <ul>
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