
import "./post.css"
import "./posts.css"
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';


export default function Posts(){
    const isAdmin = useSelector((state) => state.user.admin);
    //const isAdmin = true;
    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/api/football_match')
        .then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
        console.log("ne zaman")
        console.log(data)
    }, [])

    
    const adminActs = data.map((data,index) =>{
        return(
            <div className="post">
            <div className="postInfo">
                <div className="postCats">
                    <span className="postDate">{data.date}</span>
                </div>
                <Link style={{textDecoration:'none'}} to="/game" state={data.match_id}>
                <span className="postTitle">
                {data.home_team} -  {data.away_team}
                </span>
                </Link>
                <hr/>
                <hr/>
                <div className="postBottom">
                    <span  className="postTime">Match time: {data.time}</span>
                    <hr/>
                    <span className="postTime">Location: {data.location}</span>
                </div>
            </div>
            {isAdmin? 
            (
            <div className="admin-btn">
                <button className="admin-button">
                <Link className="text" style={{textDecoration:'none'}} to="/admin-act" state={data.match_id}>Add Administrative Act</Link>
                </button>
                <button className="admin-button">
                <Link className="text" style={{textDecoration:'none'}} to="/assignreferee" state={data.match_id}>Assign Referee</Link>
                </button>
            </div>
            ) :
            (<></>)}
            </div>
            
        )
    } )


    return (
        <div className="posts">
            {adminActs}
        </div>
    )
}