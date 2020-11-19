import React, { Component } from 'react';
import config from "./config";
import Searchform from './Searchform';
import UserInfos from './UserInfos';
import UserRepos from './UserRepos';
import logo from './logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            githubUsername: '',
            isLoading: false,
            userInfos: [],
            userRepos: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target);
        console.log(data)
        const githubUsername = data.get('githubUsername')
        const onlyOwner = data.get('onlyOwner')
        

        this.fetchData(githubUsername, onlyOwner)
    }

    async fetchData(githubUsername, onlyOwner) {
        this.setState({
            isLoading: true,
        })
        const userInfos = await this.fetchUserInfos(githubUsername)
        let userRepos = await this.fetchUserRepos(githubUsername)

        !userRepos.message && (userRepos = onlyOwner ? userRepos.filter(el => el.fork === false) : userRepos)
        this.setState({
            isLoading: false,
            githubUsername,
            userInfos,
            userRepos,
        })
    }
    async fetchUserInfos(githubUsername) {
        const req = await fetch(`${config.apiUrl.base}${config.apiUrl.users}${githubUsername}`);
        return await req.json()

    }

    async fetchUserRepos(githubUsername) {
        const req = await fetch(`${config.apiUrl.base}${config.apiUrl.users}${githubUsername}${config.apiUrl.repos}`);
        return await req.json()
    }

    render(){
        const { githubUsername, isLoading, userInfos, userRepos } = this.state
        return(
            
            <div className="wrapper">
                <Searchform 
                    handleSubmit={this.handleSubmit}
                />
                {isLoading && <span id="message">Fetching Github user...</span>}
                {!isLoading && userInfos.message && <span id="message">{userInfos.message}</span>}

                <div className="container-fluid" id="linear">
                    <div className="row row-height">                        
                        <UserInfos data={userInfos}/>
                        <UserRepos data={userRepos}/>  
                    </div>
                </div>
            </div>
        )
    }
}

export default App;