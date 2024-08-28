import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Step1Form from './Step1Form';
import Step2Assesment from './Step2Assesment';
import Step3Result from './Step3Result';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Review } from './Review';
const steps = ['Fill company details', 'Generate SWOT', 'Generate Recommendations','Review'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [recommendations, setRecommendations] = useState(null);
  const [formData,setFormData]= useState({});
  const handleNext = (data) => {
 
    setFormData(data)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const downloadTxtFile = () => {
    const textToWrite = recommendations.join('\n');
    const blob = new Blob([textToWrite], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'recommendations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleReview = recommendationData => {
    // 👇️ take the parameter passed from the Child component
    setRecommendations(recommendationData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(recommendations);
  };
  let componentToRender;
  switch (activeStep) {
    case 0:
      componentToRender = <Step1Form onNext={handleNext}/>;
      break;
    case 1:
      componentToRender = <Step2Assesment onNext={handleNext} formData={formData}/>;
      break;
    case 2:
      componentToRender = <Step3Result onNext={handleReview} formData={formData}/>;
      break;
    case 3:
      componentToRender = <Review recommendations={recommendations} onNext={handleReview}/>;
      break;
    default:
      componentToRender = <Step1Form />;
  }



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className="example" sx={{ width: '100%',height:'77vh',overflow:'auto' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep===steps.length ?(
        <React.Fragment>
   <div style={{display:'flex',flexDirection:'row',textAlign:'center',marginTop:'3rem'}}>
    <div>
  <CheckCircleRoundedIcon sx={{ fontSize: 60,color:'#86bc25' }}/>
  </div>
   <Typography sx={{ mt: 2, mb: 1 }}>

            Your report is ready . Download report <a href="#" onClick={downloadTxtFile}>here.</a>
          </Typography>
       <br/>
       <br/>
      
          </div>

        
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ):(
        <React.Fragment>
        <Container sx={{ mt: 2, mb: 1 }}>{componentToRender}</Container>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {/* <Button
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 1,display:(activeStep === 0?'none':'') }}
          >
            Back
          </Button> */}
          <Box sx={{ flex: '1 1 auto' }} />
          {/* <Button style={{visibility:(activeStep==2)?"hidden":"visible"}} onClick={handleNext} >
            {activeStep === steps.length - 1 ? 'Review' : 'Next'}
          </Button> */}
        </Box>
      </React.Fragment>
        
      )
        
      

      }
      
    </Box>
  );
}
