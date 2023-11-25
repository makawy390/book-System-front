import axios from 'axios';
import {useState} from 'react';
import url_books from '../../api/api.book';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField , Grid} from '@mui/material';
import '../css/form.css';
import { Button } from 'primereact/button';
import {RadioButton} from 'primereact/radiobutton'
import { InputNumber } from 'primereact/inputnumber';

const Register = () => {
  const initialState = {
    username : '',
    email : '' ,
    password: '',
    age : undefined,
    gender : ''
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
const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  const [image , setImage]=useState();

    const onSubmited = (e)=>{
        e.preventDefault();
        const formDataFile = new FormData();
        formDataFile.append('image',image);
        load();
        axios.post(`${url_books}/user/register`,{
            username : formData.username,
            email : formData.email,
            password : formData.password,
            age : formData.age,
             gender : formData.gender,
            profile : image

        },config).then((response)=> {
            navigate('/');
          }).catch((error) =>{
            // setError(error)
            console.log(error.response);
          });
    } 
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }
  return (
    <div className='register'>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
        <h2  className='text-center'>حساب جديد</h2>
    <form onSubmit={onSubmited} action='/' method='POST' >

<Box sx={{ display: 'flex' ,flexDirection: 'column','& .MuiTextField-root': { maxWidth: '65ch' }}} >
  <input type='file' onChange={(e)=> setImage(e.target.files[0])} />
<TextField  placeholder="ادخل الاسم الثنائي" type='text'  name="username"  sx={{margin : '10px 0'}} 
    onChange={handelChange} value={formData.username} />
    <TextField  placeholder="ادخل بريدك الالكتروني" type='email'  name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} value={formData.email} />
<TextField value={formData.password}  placeholder="ادخل كلمة المرور" type="password" name="password"  sx={{margin : '10px 0'}}
     onChange={handelChange}  />
       <InputNumber id="number-input" placeholder='كم عمرك'  name='age' value={formData.age} onValueChange={handelChange} />
  <div className="flex">
    <RadioButton inputId="ingredient1" name="gender" value="female" onChange={handelChange}
 checked={formData.gender === 'female'} />انثي
<RadioButton inputId="ingredient1" name="gender" value="male" onChange={handelChange}
 checked={formData.gender === 'male'} />ذكر
  </div> 

    </Box>
    {/* {error === null? '' : 
     <>
<Message severity="error" text={error} /><br />
     </>
} */}

    <p> لديك حساب بالفعل ؟ </p><Link to='/'>تسجيل الدخول </Link><br/>

<Button label="انشاء حساب" dir='ltr' icon="pi pi-check" loading={loading} /> 
    </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Register