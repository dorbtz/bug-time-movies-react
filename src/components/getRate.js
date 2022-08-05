import axiosInstance from "../axios";
import {RATE_MOVIE_URL} from './request_utils';
import React, {useState, useEffect, useReducer} from "react"
// import { FaStar } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import RangeSlider from 'react-bootstrap-range-slider';
import Button from '@mui/material/Button';
import Tooltip from 'react-bootstrap/Tooltip';

const GetRate = (props) => {

    const [rate, setRate] = useState(0)
    const [vote, setVote] = useState(0)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        axiosInstance.get(`rating_detail/${props.id}`)
          .then(res => setRate(res.data.avg_rate))
    
      }, [ignored])

    const handleRate = () => {
      axiosInstance
      .post(RATE_MOVIE_URL, {
          movie: props.id,
          rating: vote
      })
      forceUpdate()
    }

    const popover = (
      <Popover id="popover-basic">
          <Popover.Header as="h3">Rate {props.title} 🌟</Popover.Header>
          <Popover.Body>
          <RangeSlider
                  min={1}
                  max={10}
                  value={vote}
                  onChange={changeEvent => setVote(changeEvent.target.value)}
              />
  
          <Button onClick={handleRate}>Save</Button>
  
          </Popover.Body>
      </Popover>
      );


    
    return(
      <div>
        <span className="movie_info float-right">
          {window.localStorage.getItem(["token"]) ?
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button variant="contained" color="success">Rate this movie</Button>
          </OverlayTrigger>
          : 
          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">You need to login for get Rate access</Tooltip>}>
            <span className="d-inline-block">
              <Button disabled style={{ pointerEvents: 'none' }}>
                Rate Disabled
              </Button>
            </span>
          </OverlayTrigger>}
        </span>
        <span>{rate}/10 ⭐</span>
      </div>
      
)
}

export default GetRate;