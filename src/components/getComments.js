import axiosInstance from "../axios";
import React, {useState, useEffect} from "react"
import {MOVIE_COMMENTS_URL} from './request_utils'
import { makeStyles } from '@mui/core/styles';
import List from '@mui/core/List';
import ListItem from '@mui/core/ListItem';
import Divider from '@mui/core/Divider';
import ListItemText from '@mui/core/ListItemText';
import ListItemAvatar from '@mui/core/ListItemAvatar';
import Avatar from '@mui/core/Avatar';
import Typography from '@mui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    }));


const GetComments = (props) => {

    const [comment, setComment] = useState(0)

    const classes = useStyles();

    useEffect(() => {
        axiosInstance.get(`${MOVIE_COMMENTS_URL}/${props.id}`)
        .then(res => setComment(res.data))
    
    }, [])


    return(
        <List className={classes.root}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="default" src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" />
            </ListItemAvatar>
            <ListItemText
            primary={comment.sender_username}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    this is comment for example:
                    {comment.content}
                </Typography>
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" component="li" />  
        </List>
)
}

export default GetComments;