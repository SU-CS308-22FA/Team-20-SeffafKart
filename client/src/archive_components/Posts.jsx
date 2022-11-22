
import "./post.css"
import "./posts.css"
import Axios from "axios";
import { useEffect, useState } from "react";


export default function Posts(){
    const [data, setData] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/api/admin_acts')
        .then(res => {
            console.log("Getting from ::::", res.data)
            setData(res.data)
        }).catch(err => console.log(err))
    }, [])

    const adminActs = data.map((data,index) =>{
        return(
            <div className="post">
            <div className="postInfo">
                <div className="postCats">
                    <span className="postDate">{data.act_date}</span>
                </div>
                <span className="postTitle">
                    {data.act_game}
                </span>
                <hr/>
                <span className="postDesc">{data.act_info}</span>
                <hr/>
                <div className="postBottom">
                    <span  className="postTime">posted at {data.act_time}</span>
                    <hr/>
                    <span className="postRate">
                        <i className="postIconLike fas fa-thumbs-up"></i>
                        <i className="postIconDislike fas fa-thumbs-down"></i>
                    </span>
                </div>
            </div>
        </div>
        )
    } )


    return (
        <div className="posts">
            {adminActs}
        </div>
    )
}