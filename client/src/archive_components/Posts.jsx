
import "./post.css"
import "./posts.css"
import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Posts(){

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
        Axios.put("https://seffafkart-client.onrender.com/api/updateposrate", {
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
        
        Axios.put("https://seffafkart-client.onrender.com/api/updatenegrate", {
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
        Axios.put("https://seffafkart-client.onrender.com/api/decreaseposrate", {
          admin_act_id: id,
          user_id: user[0].id,
        })
      }

      const handleDecNeg = (id) => {
        voted[id] = "";
        Axios.put("https://seffafkart-client.onrender.com/api/decreasenegrate", {
          admin_act_id: id,
          user_id: user[0].id,
        })
      }
    

    useEffect(() => {
        Axios.get('https://seffafkart-client.onrender.com/api/admin_acts')
        .then(res => {
            console.log("Getting from ::::", res.data)
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
                        <label>{data.act_rate_pos}</label>
                        <i className="postIconLike fas fa-thumbs-up" onClick={() => handlePos(data.admin_act_id,data.act_rate_pos)}></i>
                        <i className="postIconDislike fas fa-thumbs-down" onClick={() => handleNeg(data.admin_act_id,data.act_rate_neg)}></i>
                        <label>  {data.act_rate_neg}</label>
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