import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './navbar.css';

export class NavBar extends React.Component<{}, {}> {
    public componentDidMount() {
        document.addEventListener('scroll', this.handleScroll, true);
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }

    public handleScroll = (e:any) => {
        e.preventDefault();
        
        const userWidth = window.innerWidth;
        // tslint:disable-next-line:no-console
        // console.log(e);
        const nav = document.getElementById('navbar');
        const positionY:number = e.srcElement.scrollingElement.scrollTop;

        if (userWidth > 585){
            if (positionY <= 200) {            
                nav!.classList.remove('hideNavbar');
                nav!.classList.remove('navbar__main--leftSide');
                nav!.classList.add('navbar__main--topSide');
            } else if (positionY > 200 && positionY <= 250) {
                nav!.classList.add('hideNavbar');
            } else {
                nav!.classList.remove('hideNavbar');
                nav!.classList.remove('navbar__main--topSide');
                nav!.classList.add('navbar__main--leftSide');
            }
        }
    }

    public render () {
        return (
            <nav className='navbar__main navbar__main--topSide' id='navbar' onScroll={this.handleScroll}>
                <NavLink exact={true} to='/' activeClassName='active'>Home</NavLink>
                <NavLink to='/newbook/add'>Add Book</NavLink>
                <NavLink to='/reader/'>Reader</NavLink>
            </nav>
        );
    }
}