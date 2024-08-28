import React, { useEffect, useState } from 'react'
import { Shimmer } from './Shimmer'
import { Button } from '@mui/material';
import MarkdownPreview from './MarkdownPreview.js';

export default function Step3Result({onNext,formData}) {
  const [recommendations,setRecommendations]=useState("");
  const[startmsg,setStartMsg]=useState("");
  const [isStreaming,setIsStreaming]=useState(true);

  let content="";
  const formatData=(inputData)=>{
  const rec=inputData.split('\n');
  const s=rec.splice(0,1)[0];
  if(s.length!=0)
  setStartMsg(s);
  setRecommendations(rec.filter((item)=>item.length!=0));

  }
  useEffect(()=>{
   fetchData()
  },[])

  const fetchData=async()=>{
    try{
    //   const data= await fetch("http://localhost:8000/swot_ai_content/9baac8ff-f640-4f6a-96f2-7773365d490b");
    // const jsonData=await data.json();
    fetch(`http://localhost:8000/recommendation_ai_content/${formData.org_id}`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        
    },
    body: JSON.stringify({...formData.reqBody,
      user_input:"please suggest recommendation on the analyzed SWOT of given organization: "}),
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
                    
                      setRecommendations(content);
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
// const fetchData=async()=>{
//   try{
//     let res = await fetch(`http://localhost:8000/recommendation_ai_content/${formData.org_id}`, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({...formData.reqBody,
//       user_input:"please suggest recommendation on the analyzed SWOT of given organization: "}),
//     });
//     let resJson = await res.json();
//     console.log(resJson);
//    // formatData(jsonData.data)
//   }
//   catch(error){
//     console.error('Error fetching data:', error);
//   }

// }
  return (
    <div > 
     
    {recommendations.length>0?
    (
      <div>
          <MarkdownPreview markdown={recommendations} /> 
        {/* <p>{startmsg.length>0?startmsg:"Bases on the SWOT Analysis the recommendations for this organization are:"}</p> 
          <br/>
          <ul className="list">
            {recommendations.map((item,index)=>{
              return <li key ={index} style={{padding:'5px'}}>{item}</li>
            })}
          </ul>*/}
        {!isStreaming &&  <Button className='bottomBtn' onClick={event => onNext(recommendations)} variant='contained' size='large' color='primary' >Review</Button>} 
        
      </div>
    )
    :
    <div className="">
      <Shimmer/>
    </div>
}

  </div>)
}
