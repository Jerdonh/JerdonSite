import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"; //react router will help us map url paths to specific components on the page

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import JweetList from "./components/Jweets/jweets-list";
import HomePage from "./components/Jweets/HomePage";
import CreateJweet from "./components/Jweets/create-jweet";
import RecipeList from "./components/Recipes/recipes-list";
import AboutSite from "./components/AboutTheSite/AboutSite";
import BlogPage from "./components/Blog/blog-page";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <br/>
        <Route path="/" exact component = {JweetList}/>
        <Route path="/" exact component = {CreateJweet}/>
        <Route path="/" exact component = {HomePage}/>
        <Route path="/recipes" exact component = {RecipeList}/>
        <Route path="/about" exact component = {AboutSite}/>
        <Route path="/blog" exact component = {BlogPage}/>
      </div>
    </Router>
  );
}

export default App;
//exports the App to index to js to be rendered in the html