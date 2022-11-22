import "./sidebar.css"

export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, odit quos! Deserunt et, similique molestiae totam inventore explicabo dolorem odit labore repudiandae vel consectetur debitis placeat repellat quasi aliquam sint.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Match</li>
                    <li className="sidebarListItem">Admin Acts</li>
                    <li className="sidebarListItem">Referees</li>
                </ul>
            </div>
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