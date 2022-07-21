import React, {useState, useEffect} from 'react'
import axiosInstance from '../axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function postComment(props) {

    const [data, setData] = useState({
        movie: props.id,
        content: "",
    })


    function submit(e) {
        e.preventDefault();
        axiosInstance
        .post(COMMENT_URL, {
            movie: props.id,
            content: data.content,
        })
        .then(res => console.log(res.data))
    }


    function handle(e){
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

return (
    <div>
        <form onSubmit={(e) => submit(e)}>
            <Box
                sx={{
                    width: 450,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="Comment" id="content" value={data.content} onChange={(e) => handle(e)}/>
                <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                </Button>
            </Box>
        </form>
    </div>
)
}

export default postComment