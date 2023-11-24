import React from 'react'
import {Container, Typography} from '@mui/material'
import './footer.css';

const Footer = () => {
  return (
    <footer dir='ltr'>
<Container>
    
                {/* <span></span> */}
                <Typography variant="subtitle1" component="h2">
                &copy; 2023 Mohamed Hesham. All rights reserved
</Typography>

</Container>
    </footer>
  )
}

export default Footer