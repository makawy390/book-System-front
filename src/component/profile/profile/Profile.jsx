import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import url_books from '../../api/api.book';
import  axios from 'axios';
import '../css/profile.css'
import { Link } from 'react-router-dom';
import {Grid} from '@mui/material';
import {Image} from 'primereact/image'
import EditUser from './../update user/EditUser';
const Profile = () => {
 const [profile , setProfile] = useState([]);
 const id = useSelector(state => state.data.id);
 const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
  const profileImage = 'https://final-book-system.onrender.com/uploads/profile';
 axios.get(`${url_books}/user/view/${id}` , config)
 .then(res => setProfile(res.data.data))
 .catch(error => console.log(error))
  return (
    <div className='profile' dir='ltr'>
      <Grid container spacing={2}>
        <Grid item xs={5}>
      {/* <img src={`${profileImage}/${profile.profile}`} alt="" srcset="" /> */}
      <Image src={`${profileImage}/${profile.profile}`} alt="Image"  preview />
     <h2>{profile.username}</h2>
     <h5>{profile.role}</h5>
     <hr />
     <h6>Description</h6>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore quos cumque perferendis, vel nam minus porro atque </p>
        </Grid>
        <Grid item xs={7}>
          <EditUser/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Profile