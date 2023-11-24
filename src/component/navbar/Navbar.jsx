import { NavLink } from 'react-router-dom';
import './nav.css';
import {AiOutlineSetting} from 'react-icons/ai'
import { useState } from 'react';
import {useSelector , useDispatch } from 'react-redux';
import { checkFunc } from '../../redux/reducer/createSlice';

const Navbar = () => {
  const role = useSelector(state => state.data.login);
  const check = useSelector(state => state.data.check);
  const id = useSelector(state => state.data.id);

const dispatch = useDispatch();
console.log(role);
  const [nav , setNav] = useState(false);

  const handelNavigationBar = ()=>{
    if (nav === true) {
      setNav(false)
    }
    else{
      setNav(true)
    }
  }
  return (
<>
<div className="nav-bar">
      <div className="nav">
      <ul className={`listed-unstyle ${nav === true? "right" : ''}`}>
        <div className='ic' onClick={()=> handelNavigationBar()}>
<AiOutlineSetting  className={`${nav === true? "active" : ''}`}/>
        </div>
        {check === true ?
        <>
              <li><NavLink to='/allBooks'>جميع الكتب</NavLink></li>
        <li><NavLink to={`/profile/${id}`}>حسابي</NavLink> </li>

        </>
      : ''  
      }
      {role === "admin"|| role ==="manager" ? 
     <>
      <li><NavLink to='/addNewBook'>اضافة كتاب جديد</NavLink></li> 
  <li><NavLink to={`/user/dash_board`}>dash board</NavLink> </li>
     </>
      :  ""     
       
    }
    {check === true?
       <li><NavLink to='/' onClick={()=> dispatch(checkFunc())}>تسجيل خروج</NavLink></li>  
       : 
       <li><NavLink to='/' >تسجيل دخول</NavLink></li>
  }

    </ul>
      </div>
    </div>
</>
  )
}

export default Navbar;