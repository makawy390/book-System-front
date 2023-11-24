import {  Grid, TextField } from '@mui/material';
import axios from 'axios';
import {useState} from 'react'
import url_books from '../../api/api.book';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Button} from 'primereact/button'
import { useSelector } from 'react-redux';
const AddBooks = () => {
  const initialState = {
    title : '',
    description: '',
    link : '',
    price : 0
  }
  const [bookData , setBookData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  const token = useSelector(state => state.data.token)
  const navigate = useNavigate();
  const data = {
      title : bookData.title,
      description :  bookData.description,
      link :  bookData.link,
      price :  bookData.price
    };
     let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
   const onSubmited = (e)=>{
    e.preventDefault();
    load();
    axios.post(`${url_books}/books/add` ,data ,config)
    .then((response)=> {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/allBooks');
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });    
  };
      const handelChange = (e)=>{
      setBookData({...bookData , [e.target.name] : e.target.value})
    }
  return ( 
    <div className='add-new'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={6} lg={5}>
        <h2 className='text-center'>اضافة كتاب جديد</h2>
    <form>
    <TextField fullWidth placeholder="اسم الكتاب" id="fullWidth" name='title'
     sx={{margin : '10px 0'}} onChange={handelChange} />
    <TextField fullWidth placeholder="وصف الكتاب" id="fullWidth" sx={{margin : '10px 0'}} name='description'
     onChange={handelChange}  />
    <TextField fullWidth placeholder="لينك الكتاب" id="fullWidth" name='link'
      sx={{margin : '10px 0'}} onChange={handelChange}  />
    <TextField fullWidth placeholder="سعر الكتاب" id="fullWidth" name='price'
     sx={{margin : '10px 0' }}  onChange={handelChange} />
    <Button label="اضافة كتاب" dir='ltr' icon="pi pi-check" loading={loading} onClick={onSubmited}/>
    </form>
        </Grid>
      </Grid>
    </div>
  )
}
export default AddBooks;