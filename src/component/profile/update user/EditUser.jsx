import axios from 'axios';
import {useState} from 'react';
import url_books from '../../api/api.book';
import {  useNavigate } from 'react-router-dom';
import { Box, TextField , Grid} from '@mui/material';
import { Button } from 'primereact/button';
import {InputNumber} from 'primereact/inputnumber'
import { useSelector } from 'react-redux';
import { RadioButton } from 'primereact/radiobutton';
import { Password } from 'primereact/password';

const EditUser = () => {
  const initialState = {
    username : undefined ,
    email : undefined ,
    password: undefined,
    age : undefined,
    gender : undefined,
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
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'multipart/form-data',

    }
  }  
 const id = useSelector(state => state.data.id);
  const [image , setImage]=useState();
    const onSubmited = (e)=>{
        e.preventDefault();
        const formDataFile = new FormData();
        formDataFile.append('image',image);
        axios.patch(`${url_books}/user/update-profile/${id}`,{
            username : formData.username,
            email : formData.email,
            password :formData.password,
            age : formData.age,
            gender : formData.gender,
            profile : image,
        },config).then((response)=> {
            // navigate(`/profile/${id}`);
          }).catch((error) =>{
            console.log(error.response);
          });
          load();

    } 
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }

  return (
    <div className='edit-user'>
      {/* <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={6}> */}
        <h2  className='text-center'>تعديل الحساب</h2>
    <form onSubmit={onSubmited} action={`/profile/${id}`} method='PATCH' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
  <input type='file' onChange={(e)=> setImage(e.target.files[0])} />
<TextField  placeholder="ادخل اسمك" type='text'  name="username"  sx={{margin : '10px 0'}} 
    onChange={handelChange}  value={formData.username} />
    <TextField  placeholder="ادخل بريدك الالكتروني" type='email'  name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} value={formData.email}  />
<Password  placeholder="ادخل كلمة المرور"  name="password"  sx={{margin : '10px 0'}}
     onChange={handelChange} toggleMask  />
      <InputNumber id="number-input"placeholder='كم عمرك'  name='age' value={formData.age} onValueChange={handelChange} />
    </Box>
      <div className="flex">
    <RadioButton inputId="ingredient1" name="gender" value="female" onChange={handelChange}
 checked={formData.gender === 'female'} />انثي
<RadioButton inputId="ingredient1" name="gender" value="male" onChange={handelChange}
 checked={formData.gender === 'male'} />ذكر
  </div> 

<Button label="تعديل حساب"  dir='ltr' icon="pi pi-check" loading={loading} /> 
    </form>
        {/* </Grid>
      </Grid> */}

    </div>
  )
}

export default EditUser;