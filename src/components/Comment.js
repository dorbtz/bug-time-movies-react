import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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



function Comments() {
    const classes = useStyles();

    const GetRate = (props) => {

        const [comment, setComment] = useState(0)
    
        useEffect(() => {
            axiosInstance.get(`rating_detail/${props.id}`)
            .then(res => setComment(res.data.avg_comment))
        
        }, [])
    
    
        return(
            <span className="movie_info float-right"> {comment}/10 <FaStar style={{color:"gold"}}/></span>
    )
    }

    return (
        <List className={classes.root}>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar alt="default" src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png" />
        </ListItemAvatar>
        <ListItemText
        primary="username"
        secondary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
            >
                this is comment for example
            </Typography>
            </React.Fragment>
        }
        />
    </ListItem>
    <Divider variant="inset" component="li" />  
    </List>
    )
}

export default Comments