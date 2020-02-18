import insane from 'insane';
import marked from 'marked';
import Prism from 'prismjs';
import * as React from 'react';

import './reader.css';

import { fetchChapter } from '../api/fetchingAPI';
import { CHAPTER_REGEX } from '../utils/helper';

interface IReaderProps {
    location: {
        state: {
            ch_digit: number;
            ch_end: number;
            ch_start: number;
            mdURL: string;
        };
    };
}

interface IReaderState {
    data: string;
    nextChapter: number;
    prevChapter: number;
    presentChapter: number;
}

export class Reader extends React.Component<IReaderProps, IReaderState> {
    constructor(props: IReaderProps) {
        super(props);

        this.state = {
            data: '',
            nextChapter: 0,
            presentChapter: 0,
            prevChapter: 0,
        };
    }

    public componentDidMount() {
        setTimeout(() => Prism.highlightAll(), 0);

        const { ch_digit, ch_end, ch_start, mdURL } = this.props.location.state;

        const presentChapter: number = Number(mdURL.match(CHAPTER_REGEX)![0]);
        const nextChapter: number =
            presentChapter < ch_end
                ? ch_digit === 2
                    ? Number('0' + String(presentChapter + 1))
                    : presentChapter + 1
                : ch_end;
        const prevChapter: number =
            presentChapter > ch_start
                ? ch_digit === 2
                    ? Number('0' + String(presentChapter - 1))
                    : presentChapter - 1
                : ch_start;

        this.setState({
            nextChapter,
            presentChapter,
            prevChapter,
        });

        this.fetchData(this.props.location.state.mdURL);
    }

    public parseMD = (str: string) => {
        marked.setOptions({
            gfm: true,
            highlight(code: string, lang: string) {
                return Prism.highlight(code, Prism.languages[lang || 'markup']);
            },
            sanitizer: insane,
        });
        return { __html: marked(str) };
    };

    public fetchData = (url: string) => {
        fetchChapter(url).then(data => {
            this.setState({ data });
        });
    };

    public prevChapter = () => {
        const newURL = this.props.location.state.mdURL.replace(
            CHAPTER_REGEX,
            String(this.state.prevChapter)
        );

        this.fetchData(newURL);
        return undefined;
    };

    public nextChapter = () => {
        const newURL = this.props.location.state.mdURL.replace(
            CHAPTER_REGEX,
            String(this.state.nextChapter)
        );

        this.fetchData(newURL);
        return undefined;
    };

    public render() {
        const { ch_end, ch_start } = this.props.location.state;
        const { presentChapter } = this.state;
        // ts-lint:disable-next-line:no-console

        return (
            <div className='readerDetail__main'>
                {this.state.data && (
                    <div
                        id='reader__article'
                        dangerouslySetInnerHTML={this.parseMD(this.state.data)}
                    />
                )}
                {presentChapter === ch_start ? null : (
                    <button
                        className='reader__article--buttonPrev'
                        onClick={this.prevChapter}>
                        prev
                    </button>
                )}
                {presentChapter === ch_end ? null : (
                    <button
                        className='reader__article--buttonNext'
                        onClick={this.nextChapter}>
                        next
                    </button>
                )}
            </div>
        );
    }
}
