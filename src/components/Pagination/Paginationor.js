import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginationor = ({ totalPages }) => {
  const pages = [...Array(totalPages).keys()].map(num => num+1);
  console.log(pages)
  return (
    <div>
      { pages.map(num => (
        <Stack spacing={2}>
          <Pagination count={num} color="primary" />
        </Stack>
      ))}
    </div>
  )
}

export default Paginationor