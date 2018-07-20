import * as React from 'react'
import { Link } from 'react-router-dom';

interface IHomeProps {
    mdURL: string;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export class Home extends React.Component<IHomeProps, {}> {

    public render() {
        return (
            <div className='home'>
                <h2 className='home__header'>Input Book URL</h2>
                <p>Raw Markdwon file only</p>
                <form className='home__form'>
                    <input 
                        className='home__form--input'
                        type='url' 
                        value={this.props.mdURL} 
                        onChange={this.props.handleChange} />
                    <button className='home__form--button'>
                        <Link to={{ pathname:'/reader/', state: { mdURL: this.props.mdURL} }}>Read</Link>
                    </button>
                </form>
                <section>
                    <Link to='/booklist'>Free Book List</Link>
                </section>
            </div>
        )
    }
}