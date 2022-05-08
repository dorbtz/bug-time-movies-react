import React from "react";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/dorbtz">
        BUG-TIME
      </Link>{' Just an Unfinish Business '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default Copyright;