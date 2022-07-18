import axiosInstance from "../axios";
import React, {useState, useEffect} from "react"
import {MOVIE_COMMENTS_URL} from './request_utils'
import { Button, Comment, Form } from 'semantic-ui-react'
import cn from "classnames";
import { AiOutlineLike } from "react-icons/ai";


const GetComments = (props) => {

    const [comment, setComment] = useState()

    const [liked, setLiked] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axiosInstance.get(`all_comments/${props.id}`)
        .then(response => setComment(response.data))
        console.log(response.data)
    
    }, [])


    return(
        <Comment.Group>

            <Comment>
            {/* <Comment.Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' /> */}
            <Comment.Content>
                <Comment.Author as='a'>user:{comment.sender_username}</Comment.Author>
                <Comment.Metadata>
                <div>{comment.created_at} date created</div>
                </Comment.Metadata>
                <Comment.Text>
                <p>said: {comment.content}</p>
                </Comment.Text>
                {/* <Comment.Actions>
                <Comment.Action onClick={() => {
                                setLiked(!liked);
                                setClicked(true);
                            }}
                            onAnimationEnd={() => setClicked(false)}
                            className={cn("like-button-wrapper", {
                                liked,
                                clicked,
                            })}>
                                <div className="like-button">
                                    <AiOutlineLike />
                                    <span>Like</span>
                                    <span className={cn("suffix", { liked })}>d</span>
                                </div>
                </Comment.Action>
                </Comment.Actions> */}
            </Comment.Content>
            </Comment>

            <Form reply>
            <Form.TextArea />
            <Button content='Post Comment' labelPosition='cenleftter' icon='edit' primary />
            </Form>
        </Comment.Group>


        // <List className={classes.root}>
        // <ListItem alignItems="flex-start">
        //     <ListItemAvatar>
        //         <Avatar alt="default" src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" />
        //     </ListItemAvatar>
        //     <ListItemText
        //     primary={comment.sender_username}
        //     secondary={
        //         <React.Fragment>
        //         <Typography
        //             component="span"
        //             variant="body2"
        //             className={classes.inline}
        //             color="textPrimary"
        //         >
        //             this is comment for example:
        //             {comment.content}
        //         </Typography>
        //         </React.Fragment>
        //     }
        //     />
        // </ListItem>
        // <Divider variant="inset" component="li" />  
        // </List>
)
}

export default GetComments;