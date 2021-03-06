import React from 'react';
import logo from './logo.jpg';

const Searchform = ({ handleSubmit}) => (
    <form className="text-center" onSubmit={handleSubmit}>
        <img src={logo}  alt="Logo" className="logo" width="50" length="50" ></img>
        <input
            type="text" 
            className="searchbar transparent"
            id="githubUsername"
            placeholder='Your GitHub username'
            name="githubUsername"
        />
        <input className="button" id="button" type="submit" value="Search" />
        <div className="mt-2 center">
            <label className="">Show only owned repos</label>
            <input type="checkbox" name="onlyOwner" id="onlyOwner" defaultChecked={true}/>
        </div>
    </form>
)

export default Searchform 