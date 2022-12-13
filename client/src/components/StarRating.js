import React, {useState} from 'react'
import {FaStar} from "react-icons/fa"
import './StarRating.css'
import { useDispatch, useSelector } from "react-redux";

const StarRating = (props) => {

    const [rating,setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const isLogin = useSelector((state) => state.user.isLogin);


  return (
    <div>
        {[...Array(5)].map((star,i) => {
            const ratingValue = i + 1
            return (
            <label>
                <input 
                type="radio" 
                name="rating" 
                value={ratingValue} 
                onClick={() => props.setRate(ratingValue)}
                onChange={() => setRating(ratingValue)}
                 />
                <FaStar 
                className='star' 
                color={isLogin ? (ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9") : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)} />
            </label>
            );
        })}
    </div>
  )
}

export default StarRating
