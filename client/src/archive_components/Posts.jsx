
import "./post.css"
import "./posts.css"
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';


export default function Posts(){
    const isAdmin = useSelector((state) => state.user.admin);
    //const isAdmin = true;

    const user = useSelector((state) => state.user.currentUser);
    const [data, setData] = useState([])
    let posRate = 0
    let negRate = 0
    const [pR, setPosRate] = useState();
    const [nR, setNegRate] = useState();
    const [posclick, setPosClick] = useState(false);
    const [negclick, setNegClick] = useState(false);
    const [ctr, setCtr] = useState(0);
    const [voted, setVoted] = useState({});


    const handlePos = async (id,rate) => {
        if(voted[id] === "neg") {
            setPosClick(true)
            posRate = rate + 1;
            handleDecNeg(id);
        } else if (voted[id] === "pos" && posclick){
            posRate = rate - 1;
            setPosClick(false)
        } else {
            setPosClick(true)
            posRate = rate + 1;
        }
        setPosRate(posRate)
        Axios.put("http://localhost:3001/api/updateposrate", {
          act_rate_pos: posRate,
          admin_act_id: id,
          user_id: user[0].id,
        }).then((response) => {
            setCtr(ctr+1);
            alert("update");
            voted[id] = "pos";
            setVoted(voted);
        });
      }

    const handleNeg = async (id,rate) => {
        if(voted[id] === "pos") {
            negRate = rate + 1;
            setNegClick(true)
            handleDecPos(id);
        } else if (voted[id] === "neg" && negclick){
            negRate = rate - 1;
            setNegClick(false)
        } else {
            setNegClick(true)
            negRate = rate + 1;
        }
        setNegRate(negRate)
        
        Axios.put("http://localhost:3001/api/updatenegrate", {
          act_rate_neg: negRate,
          admin_act_id: id,
          user_id: user[0].id,
        }).then((response) => {
            setCtr(ctr+1);
            alert("update");
            voted[id] = "neg";
            setVoted(voted);
        });
      }

      const handleDecPos = (id) => {
        voted[id] = "";
        Axios.put("http://localhost:3001/api/decreaseposrate", {
          admin_act_id: id,
          user_id: user[0].id,
        })
      }

      const handleDecNeg = (id) => {
        voted[id] = "";
        Axios.put("http://localhost:3001/api/decreasenegrate", {
          admin_act_id: id,
          user_id: user[0].id,
        })
      }
    

    useEffect(() => {
        Axios.get('http://localhost:3001/api/football_match')
        .then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
        console.log("ne zaman")
        console.log(ctr)
    }, [ctr])

    
 
    
     
    
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
                <Link className="text" style={{textDecoration:'none'}} to="/admin-act">Assign Referee</Link>
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