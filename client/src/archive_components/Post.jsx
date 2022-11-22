import "./post.css"

export default function Post(item){
    return (
        <div classname="post">
            <div className="postInfo">
                <div classname="postCats">
                    <span className="postCat">{item.act_date}</span>
                </div>
                <span className="postTitle">
                    {item.act_game}
                </span>
                <hr/>
                <span className="postDesc">{item.act_info}</span>
                <hr/>
                <span className="postRate">
                    <i className="postIcon fas fa-thumbs-up"></i>
                    <i className="postIcon fas fa-thumbs-down"></i>
                </span>
                <hr/>
                <span  className="postDate">{item.act_time}</span>
            </div>
        </div>
    )
}