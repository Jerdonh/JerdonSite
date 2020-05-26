import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    render (){
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className = "navbar-brand">Home</Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <Link to="/recipes" className = "navbar-brand">Recipes</Link>
                        </li>
                        <li className = "navbar-item">
                            <Link to="/blog" className = "navbar-brand">The Blog</Link>
                        </li>
                        <li className = "navbar-item">
                            <Link to="/about" className = "navbar-brand">The Site</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
};