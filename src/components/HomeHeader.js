import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/btn-Logo.png';
import homeBag from '../img/btn-home-bag.png';
import homeMember from '../img/btn-home-member.png';
import bag from '../img/btn-bag.png';
import member from '../img/btn-member.png';

export default function HomeHeader() {
    const [headerNameColor, setHeaderNameColor] = useState("#FFF")
    const [bagColor, setBagColor] = useState(homeBag)
    const [memberColor, setMemberColor] = useState(homeMember)

    // 監聽滾動，改變header樣貌
    const listenScrollEvent = () => {
        window.scrollY > 100 ? setHeaderNameColor("#496030") : setHeaderNameColor("#FFF")
        window.scrollY > 100 ? setBagColor(bag) : setBagColor(homeBag)
        window.scrollY > 100 ? setMemberColor(member) : setMemberColor(homeMember)
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent)
    })

    return(
        <header className="headerBgc">
            <div>
                <Link to="/">
                    <img className="logo" src={logo} />
                </Link> 
            </div>
            <div>
                <Link to="/" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                    Home
                </Link>
                <Link to="/Stores" className="homeHeaderName mgl-4" style={{color: headerNameColor}}>
                    Stores
                </Link>
                <Link to="/">
                    <img className="homeBag mgl-4 pdb-10" src={bagColor} />
                </Link>
                <Link to="/" >
                    <img className="homeMember mgl-4 pdb-10" src={memberColor} />
                </Link>
            </div>
            
        </header>
    );
}