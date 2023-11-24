// import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Navbar from './component/navbar/Navbar';
import Books from './component/books/all books/Books.jsx';
import { Container } from '@mui/material';
import AddBooks from './component/books/add book/AddBooks.jsx';
import ViewBook from './component/books/view book/ViewBook.jsx';
import EditeBook from './component/books/update books/EditeBook.jsx';
import Register from './component/profile/register/Register.jsx';
import Login from './component/profile/login/Login.jsx';
import {useSelector } from 'react-redux';
import Error from './component/ErrorPage/Error.jsx';
import Footer from './component/footer/Footer';
import Profile from './component/profile/profile/Profile.jsx';
import EditUser from './component/profile/update user/EditUser.jsx';
import DashBoard from './component/dashboard/dash-board/DashBoard.jsx';

function App() {
  const role = useSelector(state => state.data.login);
  const id = useSelector(state => state.data.id);

  return (
    <div dir='rtl'>
    <BrowserRouter>
    <Navbar />
    <Container>
    <Routes>
    <Route path='/' Component={Login} />
      <Route path='/allBooks' Component={Books} />
      {role === "user" ? 
        '' : <>
      <Route path='/addNewBook' Component={AddBooks} />
      <Route path='/edite/:id' Component={EditeBook} />
      
      </>
      }
      <Route path='view/:id' Component={ViewBook} />
      <Route path={`/profile/:${id}`} Component={Profile} />
      <Route path={`/edit/:${id}`} Component={EditUser} />
      <Route path='/user/dash_board' Component={DashBoard} />
      <Route path='/user/register' Component={Register} />
      <Route path='*' Component={Error} />
    </Routes>
    </Container>
    <Footer />

    </BrowserRouter>
    </div>
  );
}

export default App;
