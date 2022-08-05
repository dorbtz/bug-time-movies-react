import axiosInstance from "../axios";
import React, {useState, useEffect, useReducer} from "react"
import moment from "moment"
import {COMMENT_URL, UPDATE_COMMENT_URL, CURRENT_USER} from "./request_utils"

// comment template
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const GetComments = (props) => {

    const [comment, setComment] = useState([])
    const [user, setUser] = useState([])
    const [data, setData] = useState({
        movie: props.id,
        content: "",
    })
    const [ignored, forceUpdate] = useReducer(x => x +- 1, 0);
    // const [liked, setLiked] = useState(null);
    // const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axiosInstance
            .get(`/all_comments/${props.id}`)
            .then((res) => setComment(res.data))
        // console.log(data)

    }, [ignored])

    useEffect (() => {
        axiosInstance
        .get(CURRENT_USER)
        .then(res => setUser(res.data))
    }, [])

    function submit(e) {
        e.preventDefault();
        let id = props.id
        axiosInstance
        .post(COMMENT_URL, {
            movie: id,
            content: data.content,
        })
        forceUpdate()
    }

    const deleteComment = (id) => {
        axiosInstance.delete(`${UPDATE_COMMENT_URL}${id}`)
            .then(res => setComment(res.data))
            forceUpdate()
    }

    // function update(e) {
    //     e.preventDefault();
    //     let id = props.id
    //     axiosInstance
    //     .put(UPDATE_COMMENT_URL, {
    //         movie: id,
    //         content: data.content,
    //     })
    //     forceUpdate()
    // }


    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }


    let displayComments = []
    if (comment) {
        displayComments = comment.map((comment) => {
            const { sender_username, content, created_at, id, sender } = comment;

            return(
                <List sx={{ width: '100%', maxWidth: 1100, bgcolor: 'background', maxHeight: 300, overflow: 'auto' }} key={id} id={sender}>
                <ListItem alignItems="flex-start" key={id} id={sender}>
                    {comment.sender_username === user.username ?
                    <IconButton aria-label="delete" onClick={() => deleteComment(id)}>
                        <DeleteIcon />
                    </IconButton>
                    : 
                    <IconButton aria-label="delete" disabled color="primary">
                        <DeleteIcon />
                    </IconButton>
                    }
                    <ListItemAvatar key={id} id={sender}>
                        <Avatar alt="Remy Sharp" src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={sender_username + ":"}
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
                            {moment(created_at).format('DD/MM/YYYY HH:mm')}
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
        {comment && displayComments}
        {comment && comment.content}

        <br></br>

        <Box
                        sx={{
                            width: 450,
                            maxWidth: '100%',
                        }}
                        >
                        <TextField fullWidth label="Comment" id="content" value={data.content} onChange={(e) => handle(e)}/>
                        {window.localStorage.getItem(["token"]) ?
                        <Button onClick={(e) => submit(e)} variant="contained" endIcon={<SendIcon />}>
                                Send
                        </Button>
                        : 
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">You need to login for get Comment access</Tooltip>}>
                            <span className="d-inline-block">
                                <Button disabled style={{ pointerEvents: 'none' }} endIcon={<SendIcon />}>
                                    Comments Disabled
                                </Button>
                            </span>
                        </OverlayTrigger>}
        </Box>

        </>
)
}

export default GetComments;