import "./sidebar.css"
import Axios from "axios";
import React, {useState, useEffect} from 'react'

export default function Sidebar(){
    const [news, setNews] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:3001/api/daily_news`)
        .then(res => {
            setNews(res.data)
        }).catch(err => console.log(err))    
        console.log("news")
    },[])

    const dailynews = news.map((news, index) => {
        return (
        <div className="news-container">
          <div className="news-container-top">
            <label className="news-title">{news.title}</label>
          </div>
          <div className="news-container-bottom">
            <span  className="news-content">{news.content}</span>
          </div>
        </div>
        )});

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">Daily News Corner</span>
                <p className="sidebarText">You can find the latest updates about the Turkish Football Federation in this daily news corner.</p>
            </div>
            <div className="sidebarItem">
                {dailynews}
            </div>
            {/* <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Match</li>
                    <li className="sidebarListItem">Admin Acts</li>
                    <li className="sidebarListItem">Referees</li>
                </ul>
            </div> */}
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                </div>
            </div>
        </div>
    );
}