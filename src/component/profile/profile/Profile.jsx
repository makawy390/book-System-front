import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import url_books from '../../api/api.book';
import  axios from 'axios';
import '../css/profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
 const [profile , setProfile] = useState([]);
 const id = useSelector(state => state.data.id);
 const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
 console.log(id);
 axios.get(`${url_books}/user/view/${id}` , config)
 .then(res => setProfile(res.data.data))
 .catch(error => console.log(error))
  return (
    <div className='profile'>
     <h2>حسابي</h2>
     <h3>الاسم : {profile.username}</h3>
     <h3>البريد الالكتروني : {profile.email}</h3>
     <h3>العمر : {profile.age}</h3>
     <h3>النوع : {profile.gender}</h3>
     <h3>نوع المستخدم : {profile.role}</h3>
     <Link to={`/edit/${id}`}>تعديل الايميل</Link>
    </div>
  )
}

export default Profile