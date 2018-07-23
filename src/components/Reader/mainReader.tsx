import * as React from 'react';
import { Link } from 'react-router-dom';

export const MainReader: React.StatelessComponent<{}> = () => {
    return (
        <div className='reader__main'>
            <h4>Please pick a book in our <Link to='/'>Book List</Link> section</h4>
            <h4>or <Link to='/book/add'>Add a new one</Link></h4>
        </div>
    );
}