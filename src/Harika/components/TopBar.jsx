import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ setSearchTerm }) => {
    return (
        <header className="topBarSection">
            <div className="companyTitle">
                <Link to="/" className="link">
                    <h2>harika</h2>
                </Link>
            </div>

            <div className="searchBar">
                <input
                    type="text"
                    placeholder="Search restaurants..."
                    aria-label="Search items"
                    className="searchInput"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="userAuth">
                <button className="authButton">Login / SignUp</button>
            </div>
        </header>
    );
};

export default TopBar;