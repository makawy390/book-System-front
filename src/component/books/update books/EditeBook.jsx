import { Grid, TextField } from '@mui/material';
import {useState} from 'react';
import url_books from '../../api/api.book';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
const EditeBook = () => {
    // const [singleBook , setSingleBook] = useState([]);
    const param = useParams();   
    const [name , setName] = useState();
    const [desc , setDesc] = useState();
    const [link , setLink] = useState();
    const [price , setprice] = useState();
    const [image , setImage]=useState();

    const [loading, setLoading] = useState(false);
  const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
  const token = useSelector(state => state.data.token)

 let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',
    }
  }
const   navigate = useNavigate();
const handlerEdit = (e)=>{
    e.preventDefault();
    const formDataFile = new FormData();
    formDataFile.append('image',image);
    load();
    axios.patch(`${url_books}/books/update/${param.id}` , {
        title : name,
        description: desc,
        link : link,
        price : price,
        image : image
    },config).then((res) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(res.data);
          navigate('/allBooks');
    })
    .catch(err => console.error(err))
}
  return (
    <div className='edit'>
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs={12} md={5}>
      <h2>تعديل كتاب</h2>
    <form>
  <input type='file' onChange={(e)=> setImage(e.target.files[0])} />
    <TextField fullWidth   placeholder="اسم الكتاب" id="fullWidth" sx={{margin : '10px 0'}} 
    onChange={(e) => setName(e.target.value)} 
     />
    <TextField fullWidth   placeholder="ةصف الكتاب" id="fullWidth" sx={{margin : '10px 0'}}
    onChange={(e) => setDesc(e.target.value)} />
    <TextField fullWidth  placeholder="لينك الكتاب" id="fullWidth"  sx={{margin : '10px 0'}}
    onChange={(e) => setLink(e.target.value)}   />
    <TextField fullWidth   placeholder="سعر الكتاب" id="fullWidth" sx={{margin : '10px 0' }} 
    onChange={(e) => setprice(e.target.value)} />
    <Button label="تعديل الكتاب" dir='ltr' icon="pi pi-check" loading={loading} onClick={handlerEdit}/>
    </form>
      </Grid>
    </Grid>
    </div>
  )
}

export default EditeBook;
