
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
export const Review = ({recommendations,onNext}) => {
  
  const[recs,setRecs]=useState([...recommendations.slice(0,-1)]);
  
 
  const handleDelete = (index) => {
    setRecs((prevRecs) => prevRecs.filter((_, i) => i !== index));
  };
  const handleInputChange = (event, index) => {
    const { value } = event.target;
    setRecs((prevRecs) => {
      const newarray = Array.from(prevRecs);
      newarray[index] = value;
      return newarray;
    });
  };
  
  const handleAdd = (x) => {
    setRecs((prevRecs) => {
      const newarray = Array.from(prevRecs);
      newarray.splice(x, 0, " ");
      return newarray;
    });
  };

  
  const handleSubmit=()=>
  {
    console.log(recs);
    onNext(recs);
  }
  return (

    <div className='reviewCont'>
           <FormGroup>
  {
    recs.map((item,index)=>{
      if(item.length>0)
     return ( 
     <div   key={index} style={{display:'flex',alignItems:'center'}}>
      <TextField
      style={{padding:'5px',width:'90%'}}
      multiline
      value={item}
      onChange={($event)=>handleInputChange($event,index)}
    /> 
     <IconButton aria-label="delete" className='addBtn' onClick={()=>handleAdd(index+1)}>
        <AddIcon />
      </IconButton>
   <IconButton aria-label="delete" className='delBtn' onClick={()=>handleDelete(index)}>
        <DeleteIcon />
      </IconButton>
</div>
    
    )
    })
  }
  

</FormGroup>
<Button className='bottomBtn' onClick={event => handleSubmit()} variant='contained' size='large' color='primary' >Confirm</Button>
    </div>
  )
}
