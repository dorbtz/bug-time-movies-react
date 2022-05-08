import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "@mui/material";


const YoutubeEmbed = (props) => {

return (
    <div className="video-responsive">
    <iframe width='100%' height="600" src={props.link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;
    clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    )
}

export default YoutubeEmbed;
