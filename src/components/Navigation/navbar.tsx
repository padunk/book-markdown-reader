import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';

export const NavBar: React.StatelessComponent<{}> = () => {
    return (
        <nav className='navbar__main'>
            <NavLink exact={true} to='/' activeClassName='active'>Home</NavLink>
            <NavLink to='/booklist'>Books List</NavLink>
            <NavLink to='/reader/'>Reader</NavLink>
        </nav>
    )
}