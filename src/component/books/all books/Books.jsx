import { Box ,CardActions, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import url from '../../api/api.book';
import '../css/books.css';
import useFetch from '../fetchData/fetch data/fetchData';
import deleteBook from './../fetchData/delete data/deleteBook';
import { ProgressSpinner } from 'primereact/progressspinner';
import {useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useState } from 'react';

const Books = () => {
  const role = useSelector(state => state.data.login);
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
 
  const booksData = useFetch(`${url}/books` , pageNum , 20);
  const filtrationBooks = booksData?.map((books)=>(
<Grid item xs={12} sm={6} md={6}  lg={4}  key={books._id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {books.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {books.description}
        </Typography>
        <Typography variant="subtitle1"  color="text.secondary">
          {books.price} $
        </Typography> 
      </CardContent>
      <CardActions>
      <Stack spacing={1} direction="row">
               <Button label="View" severity="secondary" size="small"  
               raised onClick={()=> navigate(`/view/${books._id}`)} />

    {role === "admin"? 
    <>
     <Button label="Delete" severity="danger" raised  onClick={()=> deleteBook(books , booksData)} />

     <Button label="Edit" raised onClick={()=> navigate(`/edite/${books._id}`)}/>

    </>  :  ''
  }
 </Stack>
      </CardActions>
    </Grid>
  ))
  return (
    <div className='books' dir='ltr'>
    <Box sx={{ flexGrow: 1 }}>
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md:  4 , lg: 12 }} >
  {booksData === null? 
    <div className=" flex justify-content-center">
            <ProgressSpinner />
        </div> :   <>
        {filtrationBooks}
        </>
}
</Grid>
</Box>

<div className="pagination">
<Stack spacing={2} justifyContent='center' alignContent='center' alignItems='center'>
      <Pagination count={10} page={pageNum} onChange={handleChange}  color='primary'/>
    </Stack>
</div>
    </div>
  )
}

export default Books;