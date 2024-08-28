import HorizontalLinearStepper from "./components/HorizontalStepper";
import Topbar  from "./components/Topbar";
import {Box,Stack,Container} from "@mui/material";
import "./index.css"
function App() {
  return (
    <div>
    <Box className="" >
      <Stack direction="column">
        <Topbar/>
        <Container fixed style={{marginTop:'3rem',marginBottom:'1rem'}} maxWidth="lg" >
          <HorizontalLinearStepper/>
          </Container>
          
      </Stack>
     
     
    </Box>
    <footer className="s-footer"><p className="footerp"><span style={{color:'#86bc25'}}>NOTE** </span>- When using AI for client SWOT analysis, it's crucial to ensure the accuracy and reliability of the data sources, validate the generated insights, and interpret the results with human expertise for a well-rounded and actionable analysis.</p></footer>
    </div>
  );
}

export default App;
