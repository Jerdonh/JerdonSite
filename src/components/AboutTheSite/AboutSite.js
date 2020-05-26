import React, {Component} from 'react';
import axios from 'axios';

export default class AboutSite extends Component{
    constructor(props) {
        super(props);
        console.log("About Site Constructed");
    }

    componentDidMount(){
        console.log("Component mounted");
    }

    render(){
        return(
            <div>
                <div className = "row">
                    <div className = "mernStack">
                        <p>JerdonSite is a built using the MERN stack.</p>
                        <p>MongoDB</p>
                        <p>Express</p>
                        <p>React</p>
                        <p>NODE.JS</p>
                        <h4>+</h4>
                        <p>Bootstrap elements</p>
                    </div>
                    <div className = "tutorials">
                        <p>I followed many tutorials and guides to get me started, here are a few:</p>
                        <p>https://www.youtube.com/watch?v=7CqJlxBYj-M&t=3154s</p>
                        <p>https://www.youtube.com/watch?v=dGcsHMXbSOA&list=PLAXPgqkrPzudR8coJQu_JM79-g8ZQUohU&index=7&t=532s</p>
                        <p>https://www.youtube.com/watch?v=fsCjFHuMXj0&list=PLAXPgqkrPzudR8coJQu_JM79-g8ZQUohU&index=5&t=1348s</p>
                        <p>https://www.youtube.com/watch?v=vjf774RKrLc&list=PLAXPgqkrPzudR8coJQu_JM79-g8ZQUohU&index=6&t=743s</p>
                        <p>https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129</p>
                    </div>
                </div>
            </div>
        );
    };
};