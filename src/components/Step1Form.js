import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as XLSX from "xlsx";
import { useState } from 'react';
import { industrySectors,industryTypes,revenueRange } from './utils/mockdata';
import { Button, FormHelperText } from '@mui/material';
 
const Step1Form=(props)=> {
 
    const initialFValues={
      orgname:'',
      ask:'',
      industryType:'',
      industrySector:'',
      revenue:'',
      isFileValid:false
 
    }
    const [formValues,setFormValues]=useState(initialFValues)      
   
    const [data,setData]=useState([]);
    const [errors, setErrors] = useState(initialFValues);
    const [message,setMessage]=useState("");
  const validate=()=>{
    let errorMessages={};
    errorMessages.orgname=formValues['orgname']?"":"Please give a name for the company"
    errorMessages.orgsize=formValues['ask']?"":"Please give Ask"
    errorMessages.industrySector=formValues['industrySector'].length!=0?"":"Please select an industry sector"
    errorMessages.industryType=formValues['industryType'].length!=0?"":"Please select an industry type"
    errorMessages.revenue=formValues['revenue'].length!=0?"":"Please select revenue"
    //errorMessages.isFileValid=data.length>0?"":"Please select a valid excel file"
    setErrors({...errorMessages})
 
    return Object.values(errorMessages).every(x=>x=="");
  }
    const handleInputChange = (event) => {
       const {name,value}=event.target;
       setFormValues({...formValues,[name]:value})
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(validate())
    {
     
      try {
        const reqBody={
          input_type: "ask",
          user_input: formValues.ask,
          user_id: "manishkumar99@deloitte.com",
          is_free_form: true,
          chat_id: "",
          message_id: "",
          is_freeform: true,
          client_id: "",
          industry: [
            formValues.industryType
          ],
          revenue: formValues.revenue,
          organization: formValues.orgname,
          sectors: [
            formValues.industrySector
          ],
                // organization_Name: formValues.orgname,
                // // organization_Size: formValues.orgsize,
                // industry_Type: formValues.industryType,
                // industry_Sector: formValues.industrySector,
                // revenue: formValues.revenue,
                // isFileValid: formValues.isFileValid,
           
            assessment: data,
        }
        let res = await fetch("http://localhost:8000/assessment", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
        });
        let resJson = await res.json();
        console.log(resJson);
        if (res.status === 200) {
        setFormValues(initialFValues)
        setMessage("details submitted successfully")
        props.onNext({reqBody:reqBody,org_id:resJson.org_id});
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
   
  }
  const handleFile=async(e)=>{
    const reader=new FileReader();
    const file=e.target.files[0];
    console.log(file.type)
    if((file.type === 'application/vnd.ms-excel'|| file.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'))
       {
        reader.readAsBinaryString(file);
        reader.onload=(e)=>{
        const data=e.target.result;
        const workbook=XLSX.read(data,{type:"binary"});
        const sheetName=workbook.SheetNames[0];
        const sheet=workbook.Sheets[sheetName];
        const parsedData=XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
        setFormValues({...formValues,isFileValid:true})
 
    }
       }
    }
 
 
  return (
    <div>
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root , & .MuiFormControl-root': { m: 1,  },
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
  >
 
    <TextField
        required
        sx={{width:'92%'}}
        id="org-name"
        name='orgname'
        value={formValues['orgname']}
        onChange={handleInputChange}
        label="Organization name"
        error={(errors.orgname===''?false:true)}
        helperText={errors['orgname']?errors['orgname']:"Example : ABC Corporations"}
       
      />
      <TextField
        required
        sx={{width:'92%'}}
        id="ask"
        label="Ask"
        name='ask'
        onChange={handleInputChange}
        value={formValues['ask']}
        error={(errors.ask===''?false:true)}
        helperText={errors['ask']?errors['ask']:"Example : SWOT Analysis of data in year 2022"}
      />
<FormControl sx={{width:'50%'}} error={(errors.industryType===''?false:true)}>
<InputLabel id="industry-type-select-label">Industry Type</InputLabel>
  <Select
    labelId="industry-type-select-label"
    id="industry-type-select"
    value={formValues['industryType']}
    label="Industry Type"
    name='industryType'
    onChange={handleInputChange}
  >
    <MenuItem value="">Select a value</MenuItem>
    {industryTypes.map((item)=>(
        <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
    ))
 
    }
  </Select>
  <FormHelperText>{errors['industryType']}</FormHelperText>
</FormControl>
<FormControl sx={{width:'40%'}} error={(errors.industrySector===''?false:true)}>
<InputLabel id="industry-sector-select-label">Industry Sector</InputLabel>
  <Select
    labelId="industry-sector-select-label"
    id="industry-sector-select"
    value={formValues['industrySector']}
    name='industrySector'
    label="Industry Sector"
    onChange={handleInputChange}
  >
     <MenuItem value="">Select a value</MenuItem>
    {industrySectors.map((item)=>(
        <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
    ))
 
    }
  </Select>
  <FormHelperText>{errors['industrySector']}</FormHelperText>
</FormControl>
<FormControl sx={{width:'30%'}} error={(errors.revenue===''?false:true)}>
<InputLabel id="revenue-select-label">Revenue</InputLabel>
  <Select
    labelId="revenue-select-label"
    id="revenue-select"
    name='revenue'
    value={formValues['revenue']}
    label="Revenue"
    onChange={handleInputChange}
  >
     <MenuItem value="">Select a value</MenuItem>
    {revenueRange.map((item)=>(
        <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
    ))
 
    }
  </Select>
  <FormHelperText>{errors['revenue']}</FormHelperText>
</FormControl>
<TextField
        sx={{width:'60%'}}
        id="uploadfile"
        type='file'
        focused
        error={errors.isFileValid}
        label="Upload Assessment (.xlsx)"
        helperText={errors['isFileValid']}
        onChange={(e)=>handleFile(e)}
      />
     <Button type='submit' variant='contained' size='large' color='primary' className='bottomBtn' >Generate</Button>
 
  </Box>
  </div>
  )
}
export default Step1Form;