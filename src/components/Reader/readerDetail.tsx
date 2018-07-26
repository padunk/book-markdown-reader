import marked from "marked";
import Prism from 'prismjs';
import * as React from 'react';

import './reader.css';

import { fetchChapter } from '../api/fetchingAPI';

interface IReaderProps {
    location: {
        state: {
            mdURL: string;
        }
    }
}

interface IReaderState {
    data: string;
}

export class Reader extends React.Component<IReaderProps, IReaderState> {
    constructor(props: IReaderProps) {
        super(props);

        this.state = {
            data: '',
        }
    }

    public componentDidMount() {
        fetchChapter(this.props.location.state.mdURL)
        .then(data => {
            this.setState({ data });
        });
    }

    public parseMD = (str: string) => {
        marked.setOptions({
            gfm: true,
            highlight() {
                return Prism.highlightAll();
            },
            sanitize: true,
        });
        return { __html: marked(str) };
    }

    public render () {
        return (
            <div className='readerDetail__main'>
                {this.state.data && 
                    <div 
                        id='reader__article'
                        dangerouslySetInnerHTML={this.parseMD(this.state.data)}
                    />
                }
            </div>
        )
    }
}