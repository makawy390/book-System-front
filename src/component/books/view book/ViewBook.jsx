import axios from 'axios';
import {useState , useEffect, useRef} from 'react';
import {Link, useParams} from 'react-router-dom'
import url_books from '../../api/api.book';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ViewBook = () => {
    const {id} = useParams();
    const toast = useRef(null);
    const [singleBook , setSingleBook] = useState([]);
    useEffect(()=>{
      axios.get(`${url_books}/books/view/${id}`)
      .then((res)=> setSingleBook(res.data.data))
      .catch((err)=> console.error(err));
    },[id]);
    console.log(singleBook);
    const [loading, setLoading] = useState(false);

    const save = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Book is Buy' });
        }, 1000);
    };
  return (
    <div className='view' dir='ltr'>
      <h2>  {singleBook.title}</h2>
      <p>  {singleBook.description} </p>
      <p>  {singleBook.price} $ </p>
      <Link to={singleBook.link} target='_blank'>Link Book</Link> <br />
            <Toast ref={toast}></Toast>
            <Button label="Buy" icon="pi pi-plus" onClick={save}  loading={loading}  />
    </div>
  )
}
export default ViewBook;