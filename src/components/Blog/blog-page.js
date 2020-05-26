import React, {useState, Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';



function BlogMessage({message}){
    var messageArray = message.split("_n");
    return messageArray.map(messageArray => {
        return <p>{messageArray}</p>
    });
}

function Tags({tags}){
 var tagsArray = tags.split(",");
    return tagsArray.map(tag => {
        if(tag == "All"){return <span class="badge badge-primary">{tag}</span>}
        else if(tag == "Dev"){return <span class="badge badge-dark">{tag}</span>}
        else if(tag == "Finance"){return <span class="badge badge-success">{tag}</span>}
        else if(tag == "Guns"){return <span class="badge badge-danger">{tag}</span>}
        else if(tag == "Work"){return <span class="badge badge-warning">{tag}</span>}
        else if(tag == "Life"){return <span class="badge badge-light">{tag}</span>}
        else{return <span class="badge badge-dark">{tag}</span>}
    });
}


function BlogPost({name,message,id,image,date,tags}) {
    var createdAt = new Date(date); 
    
    var test = createdAt.toLocaleDateString() + " " + createdAt.toLocaleTimeString();
    //console.log("woah am i a locale time or whaattttt " + test);
    if(image.length > 4 && image.indexOf(`\\`) > -1){
        var path = image.split(`\\`);
        var img = path[path.length-1];
    }
    else{var img = "";}
    
    return(
        <div  className="alert alert-dark">
            <div className = "row">
                <h6>{name}</h6> 
                <div className = "right_container">
                    <p>{test}</p>
                </div>
            </div>
            <div className = "BlogMessageBlock">
                <img src={img} width="100"/>
                <div className = "BlogMessageBlock">
                    <BlogMessage message = {message}/>
                </div>
            </div>
            <div className = "tags">
                <Tags tags = {tags}/>
            </div>
        </div>
        
    );
}

export default class BlogPage extends Component{
    constructor(props) {
        super(props);
        this.setTagAll = this.setTagAll.bind(this);
        this.setTagLife = this.setTagLife.bind(this);
        this.setTagWork = this.setTagWork.bind(this);
        this.setTagFinance = this.setTagFinance.bind(this);
        this.setTagDev = this.setTagDev.bind(this);
        this.setTagOther = this.setTagOther.bind(this);
        this.setTagGuns = this.setTagGuns.bind(this);
        this.unhideButton = this.unhideButton.bind(this);

        this.state = {blogPosts : [], Tag: "All", allow: true}
    }

    componentDidMount(){
        axios.get("http://localhost:5000/blog/")
        .then(response => {
            this.setState({ blogPosts: response.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    unhideButton(){
        if(this.state.allow == false){
            document.getElementById("gunButton").style.opacity = 0;
            this.setState({allow: true});}
        else{
            document.getElementById("gunButton").style.opacity = 1;
            this.setState({allow: false});}
    }

    setTagAll(){
        this.setState({Tag: "All"});
    }

    setTagLife(){
        this.setState({Tag: "Life"});
    }

    setTagWork(){
        this.setState({Tag: "Work"});
    }

    setTagFinance(){
        this.setState({Tag: "Finance"});
    }

    setTagDev(){
        this.setState({Tag: "Dev"});
    }

    setTagOther(){
        this.setState({Tag: "Other"});
    }

    setTagGuns(){
        this.setState({Tag: "Guns"});
    }

    blogList(){
        console.log("blog posts:",this.state.blogPosts);
        
        this.state.blogPosts.sort((a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        return this.state.blogPosts.map(blogPosts => {
            if(this.state.Tag == "All"){return <BlogPost name ={blogPosts.name} message ={blogPosts.message} image={blogPosts.image} id = {blogPosts._id} date = {blogPosts.createdAt} tags = {blogPosts.tags}/>}
            else if(this.state.Tag == "Guns"){
                if(blogPosts.tags.includes(this.state.Tag)){return  <div>
                                                                        <BlogPost name ={blogPosts.name} message ={blogPosts.message} image={blogPosts.image} 
                                                                        id = {blogPosts._id} date = {blogPosts.createdAt} tags = {blogPosts.tags}/>
                                                                    </div>}
            }
            else{
                if(blogPosts.tags.includes(this.state.Tag) || blogPosts.tags.includes("All")){return <BlogPost name ={blogPosts.name} message ={blogPosts.message} image={blogPosts.image} id = {blogPosts._id} date = {blogPosts.createdAt} tags = {blogPosts.tags}/>}
            }
        });
    }

    render(){
        return(
            <div className = "blogPage">
                <h3><span class="label">Blog Page</span></h3>
                <div id = "sortType">
                    <p id = "sortTypeLabel">Topics:</p>
                    <div className="button">
                        <Button variant="primary" size="sm" id = "dlikeButtons" onClick = {this.setTagAll}>All</Button>
                    </div>
                    <div className="button">
                        <Button variant="light" size="sm" id = "dlikeButtons" onClick = {this.setTagLife}>Life</Button>
                    </div>
                    <div className="button">
                        <Button variant="success" size="sm" id = "dlikeButtons" onClick = {this.setTagFinance}>Finance</Button>
                    </div>
                    <div className="button">
                        <Button variant="warning" size="sm" id = "dlikeButtons" onClick = {this.setTagWork}>Work</Button>
                    </div>
                    <div className="button">
                        <Button variant="dark" size="sm" id = "dlikeButtons" onClick = {this.setTagDev}>Dev</Button>
                    </div>
                    <div className="button">
                        <Button variant="dark" size="sm" id = "dlikeButtons" onClick = {this.setTagOther}>Other</Button>
                    </div>
                    <div className="button">
                        <Button variant="danger" size="sm" id = "gunButton" onClick = {this.setTagGuns}>Guns</Button>
                    </div>
                    <div className="buttonr">
                        <Button variant="danger" size="sm" id = "dlikeButtons" onClick = {this.unhideButton}>?</Button>
                    </div>
                </div>
                {this.blogList()}
            </div>
        );
    };
};