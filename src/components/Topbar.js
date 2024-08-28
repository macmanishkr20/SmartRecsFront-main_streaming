import React from 'react'
import { Toolbar,AppBar,Typography } from '@mui/material';

export default function Topbar() {
  return (
    <AppBar position="static" style={{backgroundColor:'black'}}>
  <Toolbar variant="dense" >
    
    <Typography variant="h6" color="inherit" component="div">
      <span style={{color:'#86bc25'}}>Smart</span><span>R</span>ecs
    </Typography>
  </Toolbar>
</AppBar>
  )
}

