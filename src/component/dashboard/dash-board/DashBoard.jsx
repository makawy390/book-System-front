import  { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../css/dash-board.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import CustomizedTables from '../tabel/Tabel';
import { Grid } from '@mui/material';
export default function DashBoard() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [users , setUsers] = useState([]);
    const api = require('../../api/api.book');
     const token = useSelector(state => state.data.token);
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }  
    const fetchUsers = ()=>{
     axios.get(`${api}/user` , config)
     .then(res => setUsers(res.data.data.allUsers))
     .catch(err => console.log(err))
    }
    const arr = [];
    useEffect(() => {
     fullChart();
     fetchUsers();
    },[]);

 users.filter(ele => ele.role? arr.push(ele.role) : '')
// console.log(arr);
const arrUser = [];
const arrManager = [];
const arrAdmin = [];


arr.filter(ele => ele === "user"? arrUser.push(ele): ele === "manager"?
 arrManager.push(ele) : ele === "admin"? arrAdmin.push(ele) : '')
console.log(arrUser , arrManager , arrAdmin);

const  fullChart = ()=>{
         const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['User', 'Admin', 'Manager'],
            datasets: [
                {
                    data: [arrUser.length, arrAdmin.length, arrManager.length],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500'),

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),

                    ]
                }
            ]
        };
        const options = {
            cutout: '0%'
        };

        setChartData(data);
        setChartOptions(options);
}

// const booksData = useFetch(`${api}/books` );
// console.log(booksData.length);
    return (
        <div className="dash-board" dir='ltr'>
            <Grid container spacing={2}>
  <Grid item xs={12} md={5}>
    <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
  </Grid>
  <Grid item xs={12} md={7}>
    <CustomizedTables /> 
  </Grid>
</Grid>
        </div>
    )
}