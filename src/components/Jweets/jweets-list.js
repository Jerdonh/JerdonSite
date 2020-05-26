import React, {Component, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export function createdJweet_updateList(){
    console.log("LIST UPDATE f(x) reached");
}

function Like_Dislike({likes, id, date})
{
    //console.log("like_dislike power",power);
    const [count, setCount] = useState(likes);
    const increment = () => {
        setCount(count+1); //+ parseInt(power));
        console.log("count:",count);
        axios.post("http://localhost:5000/jweets/update/"+id, {"likes":count+1});
    }
    const decrement = () => {
        setCount(count-1);// - parseInt(power));
        axios.post("http://localhost:5000/jweets/update/"+id, {"likes":count-1});
    }
    return(
        <div className = "like_dislike">
            <Button variant="success" size="sm" id = "dlikeButtons" onClick = {increment}>Like</Button>
            <Button variant="danger" size="sm" id = "dlikeButtons" onClick = {decrement}>Dislike</Button>
            <p id = "likes">Likes: {count}|{date.slice(0,10)} </p>
        </div>
    )
}


function Jweet({name,message,likes,id,date}){
    return(
        <div className = "jweet" class="alert alert-dark" role="alert">
            <div>
                <p>{name}: {message}</p>
            </div>
            <Like_Dislike key={likes} likes = {likes} id = {id} date = {date}/>
        </div>
        
    );
}

const AddJweetHeader = () => {
    return(
        <div className = "addJweetHeader">
            <h5 style = {{padding:5}}>Name</h5>
            <h5 style = {{padding:5}}>Message</h5>
        </div>
    );
};

export default class JweetList extends Component{
    constructor(props) {
        super(props);
        this.deleteJweet = this.deleteJweet.bind(this);
        this.sortTypeLikes = this.sortTypeLikes.bind(this);
        this.sortTypeDate = this.sortTypeDate.bind(this);
        this.state = {jweets : [], sortType : "Likes"}
        createdJweet_updateList = createdJweet_updateList.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:5000/jweets/")
        .then(response => {
            this.setState({ jweets: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteJweet(id){
        axios.delete('http://localhost:5000/jweets/'+id)
        .then(res => console.log(res.data));
        this.setState({
            jweets : this.state.jweets.filter(el => el._id !==id)
        })
    }

    sortTypeLikes(){
        this.setState({sortType: "Likes"});
        //this.state.jweets.sort((a,b) => parseInt(b.likes) - parseInt(a.likes));
    }
    sortTypeDate(){
        this.setState({sortType: "Date"});
        //this.setState({jweets: this.state.jweets.sort((a,b) => parseInt(b.createdAt) - parseInt(a.createdAt))});
    }

    jweetList(){
        //return this.state.jweets.map(currentjweet => {
        //    return <Jweet jweet={currentjweet} deleteJweet = {this.deleteJweet} key = {currentjweet._id}/>;
        console.log("jweets:",this.state.jweets);
        if(this.state.sortType == "Likes")
        {this.state.jweets.sort((a,b) => parseInt(b.likes) - parseInt(a.likes));}
        else{
            this.state.jweets.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        }
        return this.state.jweets.map(jweet => {
            return <Jweet name ={jweet.name} message={jweet.message} likes={jweet.likes} id = {jweet._id} date = {jweet.createdAt}/>
        });
    }

    render(){
        return(
            <div className = "jweets">
                <div id = "sortType">
                    <p id = "sortTypeLabel">Sort By: </p>
                    <div className="button">
                        <Button variant="warning" size="sm" id = "dlikeButtons" onClick = {this.sortTypeLikes}>Likes</Button>
                    </div>
                    <div className="button">
                        <Button className="button" variant="warning" size="sm" id = "dlikeButtons" onClick = {this.sortTypeDate}>Date</Button>
                    </div>
                </div>
                {this.jweetList()}
            </div>
        );
    };
};