import axios from 'axios';
import {useState} from 'react'
import url_books from '../../api/api.book';
import { Link, useNavigate } from 'react-router-dom';
import '../css/form.css';
import { Grid, TextField } from '@mui/material';
import {useDispatch} from 'react-redux'
import { Button } from 'primereact/button';
import {Message} from 'primereact/message'
import { addData, addID, addToken, checkFunc } from '../../../redux/reducer/createSlice';
const Login = () => {
      const initialState = {
    email : '' ,
    password: ''
  }
  const [formData , setFormData] = useState(initialState)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(null);
    const dispatch = useDispatch();
    
    const load = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const onSubmitted = (e)=>{
        e.preventDefault();
    axios.post(`${url_books}/user/login` , {
        email: formData.email,
        password : formData.password
    }).then((res)=> {
        dispatch(addData(res.data.role));
        dispatch(addToken(res.data.token))
        dispatch(addID(res.data.id))
        console.log(res.data);
        navigate('/allBooks');
        dispatch(checkFunc());
    }).catch((err) =>{
         setError(err.response.data.message)
    });
    load();
    }
    const handelChange = (e)=>{
      setFormData({...formData , [e.target.name] : e.target.value})
    }
  return (
    <div className='login'>
    <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
        <h2 className='text-center'>تسجيل الدخول</h2>
        <form action="/allBooks" onSubmit={onSubmitted} method='POST'>
    <TextField fullWidth   placeholder="ادخل بريدك الالكتروني" value={formData.email}
    type='email' id="fullWidth" name="email"  sx={{margin : '10px 0'}} 
    onChange={handelChange} />
    <TextField fullWidth placeholder="ادخل كلمه المرور" value={formData.password}
     type="password" name="password" id="fullWidth" sx={{margin : '10px 0'}}
     onChange={handelChange}  />
     {error === null? '' : 
     <>
<Message severity="error" text={error} /><br />
     </>
}

<div className='link'>
<p>ليس لديك حساب؟</p><Link to='/user/register'>انشاء حساب جديد</Link><br/>
<Button label="تسجيل الدخول" dir='rtl' icon="pi pi-check" loading={loading} /> 
</div>
        </form>
        </Grid>
    </Grid>

    </div>
  )
}

export default Login;
