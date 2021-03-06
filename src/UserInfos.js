import React from "react";

const UserInfos = ({data}) => (
    
    <div className="wrapper infos text-center">

        <img src={data.avatar_url} alt="Avatar" id="avatar"/>

        <p className="h4 mt-3 m-0">{data.name}</p>

        <a href={data.html_url} target="_blank" rel="noreferrer" id="login">@{data.login}</a>
       
    </div>
)

export default UserInfos