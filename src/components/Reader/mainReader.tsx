import marked from "marked";
import * as React from 'react';

import { fetchChapter } from '../api/fetchingAPI';

interface IReaderProps {
    mdURL: string;
}

interface IReaderState {
    data: string;
}

export class MainReader extends React.Component<IReaderProps, IReaderState> {
    constructor(props: IReaderProps) {
        super(props);

        this.state = {
            data: '',
        }
    }

    public componentDidMount() {
        fetchChapter(this.props.mdURL)
        .then(data => {
            this.setState({ data });
        })
    }

    public parseMD = (str: string) => {
        marked.setOptions({
            sanitize: true
        });
        return { __html: marked(str) };
    }

    public render () {
        // tslint:disable-next-line:no-console
        console.log(this.props)
        return (
            <div className='reader__main'>
                {this.state.data && 
                    <article 
                        className='reader__article'
                        dangerouslySetInnerHTML={this.parseMD(this.state.data)}
                    />
                }
            </div>
        )
    }
}