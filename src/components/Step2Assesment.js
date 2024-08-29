import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import MarkdownPreview from './MarkdownPreview.js';
import { Shimmer } from "./Shimmer";
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
const Step2Assesment=({onNext,formData})=> {
 const [swot,setSwot]=useState("");
const [isStreaming,setIsStreaming]=useState(true);
 let content="";
 const [strengths,setStrengths]=useState([]);
 const [gaps,setGaps]=useState([]);
 const [opportunities,setOpportunities]=useState([]);
 const [threats,SetThreats]=useState([]);
 const [sources,SetSources]=useState([]);


 useEffect(()=>{
  fetchData()
},[])
 const formatData=(inputData)=>{
  const content = inputData.data;

  const sections = content.split('\n\n');

const swotData = {
  strengths: getSectionData("Strengths:", sections),
  weaknesses: getSectionData("Weaknesses:", sections),
  opportunities: getSectionData("Opportunities:", sections),
  threats: getSectionData("Threats:", sections)
};

const label = { inputProps: { 'aria-label': 'Checkbox' } };

setGaps(swotData.weaknesses);
setStrengths(swotData.strengths);
setOpportunities(swotData.opportunities);
SetThreats(swotData.threats);
console.log('SWOT Analysis:', swotData);
 }
 const formatSources=(data)=>{
  const sourcesData= data.split('\n').filter((s)=>s.length!=0);
  sourcesData.splice(0,1)
  console.log(sourcesData);
  SetSources(sourcesData);
 }
 const getSectionData=(sectionTitle, sections)=> {
  const sectionIndex = sections.findIndex(section => section.startsWith(sectionTitle));
  if (sectionIndex !== -1) {
    const sectionContent = sections[sectionIndex].substring(sectionTitle.length).trim();
    return sectionContent.split('\n').map(item => item.trim().replace('-',''));
  }
  return [];
}
 async function fetchData(){
  try{
  //   const data= await fetch("http://localhost:8000/swot_ai_content/9baac8ff-f640-4f6a-96f2-7773365d490b");
  // const jsonData=await data.json();
  fetch(`http://localhost:8000/swot_ai_content/${formData.org_id}`,{
    headers: {
      userid:"manishkumar99@deloitte.com"
    }
  })
    .then(response => {
        // Get the readable stream from the response body
        const stream = response.body;
        // Get the reader from the stream
        const reader = stream.getReader();
        // Define a function to read each chunk
        const readChunk = () => {
            // Read a chunk from the reader
            reader.read()
                .then(({
                    value,
                    done
                }) => {
                    // Check if the stream is done
                    if (done) {
                        // Log a message
                        setIsStreaming(false);
                        console.log('Stream finished');
                        // Return from the function
                        return;
                    }
                    setIsStreaming(true);
                    // Convert the chunk value to a string
                    const chunkString = new TextDecoder().decode(value);
                   // setResString((prev)=>prev+chunkString);
                    // Log the chunk string
                    if(chunkString!=="@#DONE#@")
                    {content=content+chunkString;
             
                  setSwot(content)
                    }
                    //setSwot((prev)=>prev+chunkString);
                    console.log(chunkString)
                    // Read the next chunk
                    readChunk();
                })
                .catch(error => {
                    // Log the error
                    console.error(error);
                });
        };
        // Start reading the first chunk
        readChunk();
    })
    .catch(error => {
        // Log the error
        console.error(error);
    });
  // console.log("this is full data",jsonData);
  // formatData(jsonData);
  // formatSources(jsonData.links);
  // setSwot(jsonData);
  }
 catch(error){
  console.error('Error fetching data:', error);
 }
 }
 
  return (
    <div >
      {swot.length>0?
      (<>
         <MarkdownPreview markdown={swot} /> 
        {!isStreaming &&  <Button className='bottomBtn' onClick={event => onNext(formData)} variant='contained' size='large' color='primary' >Generate Recommendations</Button>}
 </>
        // <div>
        //   <p>Based on the assessment and global standards for an organization in the same industry type and sector, 
        //     the following is the SWOT analysis for this organization-</p>
        //     <br/>
        //     <h4>Strengths:</h4>
        //     <br/>
        //       <List component="ol">
        //         {strengths.map((item, index) => (
        //           <ListItem key={index} disablePadding>
        //             <Checkbox disabled checked /> {/* This renders the checkbox */}
        //             <ListItemText primary={index + 1 +". " + item} />
        //           </ListItem>
        //         ))}
        //       </List>
        //     <br/>
        //     <h4>Weaknesses:</h4>
        //     <br/>
        //       <List component="ol">
        //         {gaps.map((item, index) => (
        //           <ListItem key={index} disablePadding>
        //             <Checkbox disabled checked /> {/* This renders the checkbox */}
        //             <ListItemText primary={index + 1 +". " + item} />
        //           </ListItem>
        //         ))}
        //       </List>
        //     <br/>
        //     <h4>Opportunities:</h4>
        //     <br/>
        //       <List component="ol">
        //         {opportunities.map((item, index) => (
        //           <ListItem key={index} disablePadding>
        //             <Checkbox disabled checked /> {/* This renders the checkbox */}
        //             <ListItemText primary={index + 1 +". " + item} />
        //           </ListItem>
        //         ))}
        //       </List>
        //     <br/>
        //     <h4>Threats:</h4>
        //     <br/>
        //       <List component="ol">
        //         {threats.map((item, index) => (
        //           <ListItem key={index} disablePadding>
        //             <Checkbox disabled checked /> {/* This renders the checkbox */}
        //             <ListItemText primary={index + 1 +". " + item} />
        //           </ListItem>
        //         ))}
        //       </List>
        //     <br/>
        //     {sources?(<div>
        //       <br/>
        //       <h4>Sources:</h4>
        //       <ol className="list">
        //       {sources.map((item,index)=>{
        //        return  <li key={index} className="source_item">{item}</li>
        //       })}
        //     </ol>
        //     </div>):''

        //     }
            
        //     <Button className='bottomBtn' onClick={event => onNext()} variant='contained' size='large' color='primary' >Generate Recommendations</Button>
        // </div>
      )
      :
      <div >
        <Shimmer/>
      </div>
     

      }
     
    </div>
  )
}
export default Step2Assesment;