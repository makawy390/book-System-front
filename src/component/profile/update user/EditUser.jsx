import axios from 'axios';
import {useState} from 'react';
import url_books from '../../api/api.book';
import {  useNavigate } from 'react-router-dom';
import { Box, TextField , Grid} from '@mui/material';
import { Button } from 'primereact/button';
import {RadioButton} from 'primereact/radiobutton'
import { useSelector } from 'react-redux';
const EditUser = () => {
  const initialState = {
    username : String ,
    email : String ,
    password: String,
    age : Number,
    gender : String,
  }
  const [formData , setFormData] = useState(initialState)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const load = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  };
 const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
 const id = useSelector(state => state.data.id);

    const onSubmited = (e)=>{
        e.preventDefault();
        load();
        axios.patch(`${url_books}/user/update-profile/${id}`,{
            username : formData.username,
            email : formData.email,
            password :formData.password,
            age : formData.age,
            gender : formData.gender,
        },config).then((response)=> {
            navigate(`/profile/${id}`);
          }).catch((error) =>{
            console.log(error.response);
          });
    } 
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }

  return (
    <div className='edit-user'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
        <h2  className='text-center'>حساب جديد</h2>
    <form onSubmit={onSubmited} action={`/profile/${id}`} method='PATCH' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
<TextField  placeholder="ادخل الاسم الثنائي" type='text'  name="username"  sx={{margin : '10px 0'}} 
    onChange={handelChange}  value={formData.username} />
    <TextField  placeholder="ادخل بريدك الالكتروني" type='email'  name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} value={formData.email}  />
<TextField  placeholder="ادخل كلمة المرور" type="password" name="password"  sx={{margin : '10px 0'}}
     onChange={handelChange}  />
  <input type="number" name='age'  onChange={handelChange}  value={formData.age}/>
  <div className="flex">
    <RadioButton inputId="ingredient1" name="gender" value="female" onChange={handelChange}
 checked={formData.gender === 'female'} />انثي
<RadioButton inputId="ingredient1" name="gender" value="male" onChange={handelChange}
 checked={formData.gender === 'male'} />ذكر
  </div>
    </Box>

<Button label="تعديل حساب" dir='ltr' icon="pi pi-check" loading={loading} /> 
    </form>
        </Grid>
      </Grid>

    </div>
  )
}

export default EditUser;