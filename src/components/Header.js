import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/btn-Logo.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';

export default function Header() {
    return(
        <header className="headerBgc">
            <div>
                <Link to="/">
                    <img className="logo" src={logo} />
                </Link> 
            </div>
            <div>
                <Link to="/" className="headerName mgl-4">
                    Home
                </Link>
                <Link to="/Stores" className="headerName mgl-4">
                    Stores
                </Link>
                <Link to="/">
                    <img className="homeBag mgl-4 pdb-10" src={bag} />
                </Link>
                <Link to="/" >
                    <img className="homeMember mgl-4 pdb-10" src={member} />
                </Link>
            </div>
            
        </header>
    );
}