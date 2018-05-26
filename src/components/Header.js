import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Nawigacja</Link>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Strona główna</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/event/create">Nowe wydarzenie</Link>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" back>Wstecz</a>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
}