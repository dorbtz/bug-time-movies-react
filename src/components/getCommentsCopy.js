import axiosInstance from "../axios";
import React, {useState, useEffect} from "react"
import {COMMENT_URL} from './request_utils'
import { Button, Form } from 'semantic-ui-react'
import moment from "moment"


const GetCommentsCopy = (props) => {

    const [comment, setComment] = useState([])

    const [liked, setLiked] = useState(null);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        axiosInstance
            .get(`/all_comments/${props.id}`)
            .then((res) => setComment(res.data))
        // console.log(data)

    }, [])

    const handleComment = () => {
        console.log()
        axiosInstance
        .post(COMMENT_URL, {
            movie: props.id,
            content: comment
        })
    }





    let displayComments = []
    if (comment) {
        displayComments = comment.map((comment) => {
            const { movie, movie_name, sender_username, content, id, created_at } = comment;
            return(
                    <div className="container my-5 py-5">
                    <div className="row d-flex justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="card text-dark">
                        <div className="card-body p-4">
                            <h4 className="mb-0">Recent comments</h4>
                            <p className="fw-light mb-4 pb-2">Latest Comments section by users</p>

                            <div className="d-flex flex-start">
                            <img className="rounded-circle shadow-1-strong me-3"
                                src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" alt="avatar" width="60"
                                height="60" />
                            <div>
                                <h6 className="fw-bold mb-1">{sender_username}</h6>
                                <div className="d-flex align-items-center mb-3">
                                <p className="mb-0">
                                    {moment(created_at).format('YY/MM/DD HH:mm')}
                                </p>
                                <a href="#!" className="link-muted"><i className="fas fa-pencil-alt ms-2"></i></a>
                                </div>
                                <p className="mb-0">
                                    {content}
                                </p>
                            </div>
                            </div>
                        </div>

                        <hr className="my-0" />
                        </div>
                        </div>
                        </div>
                    </div>
            )
        })
    }

    return(
        <>
        {comment ? displayComments : "no comments yet"}
        {comment && comment.content}
        
        <br></br>
            <Form reply>
            <Form.TextArea />
            <Button content='Post Comment' labelPosition='right' icon='edit' primary />
            </Form>
        </>
    
)
}

export default GetCommentsCopy;