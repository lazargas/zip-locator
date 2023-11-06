import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { dynamoDB } from '../../db';
import Loader from '../atoms/Loader';

const LocationInfo = () => {
  const dispatch = useDispatch();

  const zipCodeData = useSelector((state) => state.zipCodeData);
//   const [d,setd] = useState({
//     country:'',
//     state:'',
//     placeName:''
//   });
   const [view,setView] = useState(false);
   
  
   useEffect(()=>{
     setTimeout(()=>{
          setView(true);  
     },2000)
   },[zipCodeData]);

  if (!zipCodeData) {
    return null;
  }
    const country = zipCodeData.country;
    const state = zipCodeData.places[0].state;
    const placeName = zipCodeData.places[0]['place name'];
    const data = {
        country: country,
        state: state,
        placeName: placeName
      };
    console.log(zipCodeData);
    
    const pin = zipCodeData["post code"]; 
    
    
        const params = {
          TableName: 'zipcode',
          Item: {
            pin:pin,
            country: data.country,
            state: data.state,
            place: data.placeName,
          },
        };
  
        dynamoDB.put(params).promise();
  
       
    
    

  return (
    <>
    {view?<Location data={data}/>:<Loader/>}
    </>
  );
};

const Location = ({data}) =>{
    return (
        
<div class="block max-w-sm p-12 bg-white border border-gray-200 rounded-lg">

      <h2 className="text-xl font-bold mb-2">Location Information</h2>
      <p className="mb-2">
        <span className="font-semibold">Country:</span> {data.country}
      </p>
      <p className="mb-2">
        <span className="font-semibold">State:</span> {data.state}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Place Name:</span> {data.placeName}
      </p>
    
</div>

       
    );
}

export default LocationInfo;
