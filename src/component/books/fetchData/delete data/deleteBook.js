import axios from "axios";
import url_books from "../../../api/api.book";
import Swal from "sweetalert2";
const deleteBook = (book , data) => {
    Swal.fire({
      title: `Are You Sure to Delete Book ${book.title}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        
    axios.delete(`${url_books}/books/delete/${book._id}`)
    .then((res)=> {
      console.log(res);
       return data;
    })
    .catch((err)=> console.error(err));
      }
    })
    }

    export default deleteBook;