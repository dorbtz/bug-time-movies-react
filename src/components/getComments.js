import axiosInstance from "../axios";
import React, {useState, useEffect, useReducer} from "react"
import moment from "moment"

// comment template
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const GetComments = (props) => {

    const [comment, setComment] = useState([])
    // const [liked, setLiked] = useState(null);
    // const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axiosInstance
            .get(`/all_comments/${props.id}`)
            .then((res) => setComment(res.data))
        // console.log(data)

    }, [])


    let displayComments = []
    if (comment) {
        displayComments = comment.map((comment) => {
            const { sender_username, content, created_at } = comment;

            return(
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={sender_username}
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {content}
                            </Typography>
                            <br></br>
                            {moment(created_at).format('YY/MM/DD HH:mm')}
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </List>
            )
        })
    }

    return(
        <>
        {comment ? displayComments : "no comments yet"}
        {comment && comment.content}

        <br></br>

        </>
)
}

export default GetComments;