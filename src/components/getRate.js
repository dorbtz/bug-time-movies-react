import axiosInstance from "../axios";
import React, {useState, useEffect} from "react"
import { FaStar } from "react-icons/fa";

const GetRate = (props) => {

    const [rate, setRate] = useState(0)

    useEffect(() => {
        axiosInstance.get(`rating_detail/${props.id}`)
          .then(res => setRate(res.data.avg_rate))
    
      }, [])


    return(
        <span className="movie_info float-right"> {rate}/10 <FaStar /></span>
)
}

export default GetRate;