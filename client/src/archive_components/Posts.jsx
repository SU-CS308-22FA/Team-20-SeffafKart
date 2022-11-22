
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
     

    const handlePos = async (id,rate) => {
        // if(!posclick && !negclick) {
        //   posRate = posRate + 1;
        //   setPosClick(true);
        // } else if (!posclick && negclick) {
        //   posRate = posRate + 1;
        //   setPosClick(true);
        //   handleDecNeg(id);
        //   setNegClick(false);
        // }
        posRate = rate + 1;
        setPosRate(posRate)
        Axios.put("http://localhost:3001/api/updateposrate", {
          act_rate_pos: posRate,
          admin_act_id: id,
          user_id: user[0].id,
        }).then((response) => {
            setCtr(ctr+1);
            alert("update");
        });
      }

    const handleNeg = async (id,rate) => {
        // if(!posclick && !negclick) {
        //   negRate = negRate + 1;
        //   setNegClick(true);
        // } else if (posclick && !negclick) {
        //   negRate = negRate + 1;
        //   setNegClick(true);
        //   handleDecPos(id);
        //   setPosClick(false);
        // }
        negRate = rate + 1;
        setNegRate(negRate)
        
        Axios.put("http://localhost:3001/api/updatenegrate", {
          act_rate_neg: negRate,
          admin_act_id: id,
          user_id: user[0].id,
        }).then((response) => {
            setCtr(ctr+1);
            alert("update");
        });
      }
    

    useEffect(() => {
        Axios.get('http://localhost:3001/api/admin_acts')
        .then(res => {
            console.log("Getting from ::::", res.data)
            setData(res.data)
        }).catch(err => console.log(err))
        console.log("ne zaman")
        console.log(ctr)
    }, [ctr])

    
      const handleDecNeg = (id) => {
        negRate = negRate - 1;
        setNegRate(negRate);
        Axios.put("http://localhost:3001/api/updatenegrate", {
          act_rate_neg: negRate,
          admin_act_id: id,
        })
      }
    
      const handleDecPos = (id) => {
        posRate = posRate - 1;
        setPosRate(posRate)
        Axios.put("http://localhost:3001/api/updateposrate", {
          act_rate_pos: posRate,
          admin_act_id: id,
        })
      }
    
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