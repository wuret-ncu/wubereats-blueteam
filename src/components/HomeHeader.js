import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/btn-Logo.png';
import homeBag from '../img/btn-bag.png';
import homeMember from '../img/btn-member.png';

export default function HomeHeader() {
    return(
        <header className="headerBgc">
            <div>
                <Link to="/">
                    <img className="logo" src={logo} />
                </Link> 
            </div>
            <div>
                <Link to="/" className="headerName mgl">
                    Home
                </Link>
                <Link to="/Stores" className="headerName mgl">
                    Stores
                </Link>
                <Link to="/">
                    <img className="homeBag mgl" src={homeBag} />
                </Link>
                <Link to="/" >
                    <img className="homeMember mgl" src={homeMember} />
                </Link>
            </div>
            
        </header>
    );
}