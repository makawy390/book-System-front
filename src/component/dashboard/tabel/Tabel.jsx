import * as React from 'react';
import  { tableCellClasses , Table , styled,  TableBody 
  , TableRow  , TableCell,TableContainer , TableHead} from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios  from 'axios';
import { useSelector } from 'react-redux';
import api from '../../api/api.book'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables(data) {
    const [user , setUser] = React.useState([]);
     const token = useSelector(state => state.data.token);
     let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
    React.useEffect(()=>{
     axios.get(`${api}/user` , config)
     .then(res => setUser(res.data.data.allUsers))
     .catch(err => console.log(err))
    },[]);
    console.log(user);   

  return (
    <TableContainer>
      <Table sx={{ maxWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>username</StyledTableCell>
            <StyledTableCell>email</StyledTableCell>
            <StyledTableCell>age</StyledTableCell>
            <StyledTableCell>role</StyledTableCell>
            <StyledTableCell>operation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell>
                {user.username}
              </StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.age}</StyledTableCell>
              <StyledTableCell>{user.role}</StyledTableCell>
              <StyledTableCell align='center'><MdDelete /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}