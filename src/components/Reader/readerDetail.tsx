import insane from 'insane';
import marked from 'marked';
import Prism from 'prismjs';
import * as React from 'react';
import { Link } from 'react-router-dom';

import './reader.css';

import { fetchChapter } from '../api/fetchingAPI';
import { CHAPTER_REGEX, checkChapter } from '../utils/helper';

interface IReaderProps {
    match: {
        params: {
            book: string;
        };
    };
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
        setTimeout(() => Prism.highlightAll(), 0);
    }

    public componentDidUpdate() {
        setTimeout(() => Prism.highlightAll(), 0);
    }

    public parseMD = (str: string) => {
        const renderer: any = new marked.Renderer();
        marked.setOptions({
            gfm: true,
            // highlight(code: string, lang: string) {
            //     const language = lang === 'txt' ? 'markup' : lang;
            //     return Prism.highlight(code, Prism.languages[language || 'js']);
            // },
            sanitizer: insane,
        });

        // const sanitizeString = insane(str, {
        //     allowedTags: ['img', 'p']
        // })
        return { __html: marked(str, { renderer }) };
    };

    public fetchData = (url: string) => {
        fetchChapter(url).then(data => {
            this.setState({ data });
        });
    };

    public render() {
        // ts-lint:disable-next-line:no-console
        // console.log(this.props.location)
        const { ch_digit, ch_end, ch_start, mdURL } = this.props.location.state;
        const { data, nextChapter, presentChapter, prevChapter } = this.state;

        const nextURL = checkChapter(ch_digit, mdURL, nextChapter);
        const prevURL = checkChapter(ch_digit, mdURL, prevChapter);
        const { book } = this.props.match.params;

        // ts-lint:disable-next-line:no-console
        // console.log('md:', mdURL);
        // console.log('next:', nextURL);
        return (
            <div className='readerDetail__main'>
                {data && (
                    <div
                        id='reader__article'
                        dangerouslySetInnerHTML={this.parseMD(data)}
                    />
                )}
                <div className='readerDetail__main--controller'>
                {presentChapter === ch_start ? null : (
                    <Link
                        className="link__button"
                        to={{
                            pathname: `/reader/${book}/chapter${String(
                                prevChapter
                            )}`,
                            state: {
                                ch_digit,
                                ch_end,
                                ch_start,
                                mdURL: prevURL,
                            },
                        }}>
                        &lt; Chapter {String(prevChapter)}
                    </Link>
                )}
                {presentChapter === ch_end ? null : (
                    <Link
                        className="link__button"
                        to={{
                            pathname: `/reader/${book}/chapter${String(
                                nextChapter
                            )}`,
                            state: {
                                ch_digit,
                                ch_end,
                                ch_start,
                                mdURL: nextURL,
                            },
                        }}>
                        Chapter {String(nextChapter)} &gt;
                    </Link>
                )}
                </div>
            </div>
        );
    }
}
