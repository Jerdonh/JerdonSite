import React, {useState, Component} from 'react';
import { Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Route} from "react-router-dom"
import axios from 'axios';

function Difficulty({difficulty})
{
    return(
        <div>
            <p>Difficulty: {difficulty}</p>
        </div>
    );
}

function Like_Dislike({likes, id})
{
    //console.log("like_dislike power",power);
    const [count, setCount] = useState(likes);
    const increment = () => {
        setCount(count+1); //+ parseInt(power));
        console.log("count:",count);
        axios.post("http://localhost:5000/recipes/update/"+id, {"likes":count+1});
    }
    const decrement = () => {
        setCount(count-1);// - parseInt(power));
        axios.post("http://localhost:5000/recipes/update/"+id, {"likes":count-1});
    }
    return(
        <div className = "rlike_dislike">
            <Button variant="success" size="sm" id = "dlikeButtons" onClick = {increment}>Like</Button>
            <Button variant="danger" size="sm" id = "dlikeButtons" onClick = {decrement}>Dislike</Button>
            <p id = "likes">Likes: {count} </p>
        </div>
    )
}

function Instructions({instructions}){
    const instructionsArr = instructions.split(",");

    return(
        <div className = "instructions">
            <h4>Instructions</h4>
            <div class="alert alert-primary" role="alert">
                {instructionsArr.map(function(instruction){
                    return <p className = "instruction">{instruction}</p>;
                })}
            </div>
        </div>
    )
}

function Ingredients({ingredients}){
    const ingredientsArr = ingredients.split(",");

    return(
        <div className = "ingredients">
            <h4>Ingredients</h4>
            <div class="alert alert-warning" role="alert">
                {ingredientsArr.map(function(ingredient){
                    return <p className = "ingredient">{ingredient}</p>;
                })}
            </div>
        </div>
    )
}

function Recipe({name,ingredients,instructions,likes,id,date,difficulty}){
    const [open, setOpen] = useState(false);

    const clickedRecipe = () => {
        console.log("Clicked", name);
        setOpen(!open);
    }

    function changeBackground(e) {
        e.target.style.cursor = 'pointer';
      }

      function changeBackBackground(e) {
        //e.target.style.border = '0px solid white';
      }

    return(
        <div  className="alert alert-dark" 
        onClick = {clickedRecipe} onMouseOver = {changeBackground} onMouseOut = {changeBackBackground}
        aria-controls = "collapser" aria-expanded = {open}>
            <div className = "row">
                <h3>{name}</h3>
                <div className = "center_container">
                    <Difficulty difficulty = {difficulty}/>
                </div>
                <div className = "right_container">
                    <Like_Dislike key={likes} likes = {likes} id = {id}/>
                </div>
            </div>
            <Collapse in= {open}>
                <div id = "collapser">
                    <Ingredients ingredients = {ingredients}/>
                    <Instructions instructions = {instructions}/>
                </div>
            </Collapse>
        </div>
        
    );
}

export default class RecipeList extends Component{
    constructor(props) {
        super(props);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.sortByLikes = this.sortByLikes.bind(this);
        this.sortByDifficulty = this.sortByDifficulty.bind(this);
        this.state = {recipes : [], sortBy: "likes"}
    }

    sortByLikes(){
        this.setState({sortBy: "likes"});
        //this.state.recipes.sort((a,b) => parseInt(b.likes) - parseInt(a.likes));
    }
    sortByDifficulty(){
        this.setState({sortBy: "difficulty"});
        //this.setState({recipes: this.state.recipes.sort((a,b) => b.difficulty - a.difficulty)});
    }

    componentDidMount(){
        axios.get("http://localhost:5000/recipes/")
        .then(response => {
            this.setState({ recipes: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteRecipe(id){
        axios.delete('http://localhost:5000/recipes/'+id)
        .then(res => console.log(res.data));
        this.setState({
            recipes : this.state.recipes.filter(el => el._id !==id)
        })
    }

    recipeList(){
        console.log("recipes:",this.state.recipes);
        if(this.state.sortBy === "likes"){
            this.state.recipes.sort((a,b) => parseInt(b.likes) - parseInt(a.likes));}
        else{
        this.state.recipes.sort((a,b) => parseInt(a.difficulty) - parseInt(b.difficulty));}
        return this.state.recipes.map(recipe => {
            return <Recipe name ={recipe.name} ingredients={recipe.ingredients} instructions={recipe.instructions} likes={recipe.likes} id = {recipe._id} date = {recipe.createdAt} difficulty = {recipe.difficulty}/>
        });
    }

    render(){
        return(
            <div>
                <h4>Recipes</h4>
                <p>I love all sorts of cooking and especially love collecting unique and flavorful recipes. Scroll down and select one of my favorite recipes to learn how to make it yourself!</p>
                <div id = "sortType">
                    <p id = "sortTypeLabel">Sort By: </p>
                    <Button variant="outline-primary" size="sm" id = "dlikeButtons" onClick = {this.sortByLikes}>Likes</Button>
                    <Button variant="outline-primary" size="sm" id = "dlikeButtons" onClick = {this.sortByDifficulty}>Difficulty</Button>
                </div>
                {this.recipeList()}
            </div>
        );
    };
};