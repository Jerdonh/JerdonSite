import React, {Component} from 'react';
import axios from 'axios';
import createdJweet_updateList from "./jweets-list";
import Button from 'react-bootstrap/Button';


export default class CreateJweet extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeLikes = this.onChangeLikes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name : "",
            message : "",
            likes : 0,
            date : Date.now()
        }
    }

    componentDidMount(){
        //this will be called before anything is displayed on the page
        this.setState({
            name : "",
            message : "",
            likes : 0,
            date : Date.now()
        })
    }

    onChangeName(e){
        this.setState({
        name: e.target.value
    });
    }

    onChangeMessage(e){
        this.setState({
        message: e.target.value
    });
    }

    onChangeLikes(likes){
        this.setState({
        likes: likes
    });
    }

    onChangeDate(e){
        this.setState({
        date: Date.now()
    });
    }

    onSubmit(e) {
        e.preventDefault();
        const jweet = {
            name: this.state.name,
            message: this.state.message,
            likes: 0,
            date: Date.now()
        }
        //here submit to database
        axios.post("http://localhost:5000/jweets/add", jweet)
        .then(res => console.log(res.data));
        
        window.location = "/";
    }


    render(){
        return(
            <div id = "createJweet">
                {/*<div class="alert alert-dark" role="alert">
                    Leave a Message</div>*/}
                <form onSubmit={this.onSubmit}>
                    <div className ="addJweetInput">
                        {/*<label className = "addJweetLabel">Name: </label>*/}
                        <h4> Name&ensp;&ensp; </h4>
                        <input id = "addJweetInputTxt" type = "text" required className = "form-control" 
                        value={this.state.name}
                        onChange={this.onChangeName}>
                        </input>
                    </div>
                    <div className ="addJweetInput">
                        <h5>Message&ensp; </h5>
                        <input id = "addJweetInputTxt" ref="userInput" required className = "form-control" 
                        value={this.state.message}
                        onChange={this.onChangeMessage}>
                        </input>
                    </div>
                    <div className = "form-group">
                        {<Button onClick={this.onSubmit} variant="warning">Leave a Message!</Button>}
                    </div>
                </form>
            </div>
        );
    };
};