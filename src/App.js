import React, { useEffect, useState } from 'react';
import ZipCodeForm from './components/Molecules/ZipCodeForm';
import LocationInfo from './components/Molecules/LocationInfo';
import Navbar from './components/Organisms/Navbar';
import { useSelector } from 'react-redux';
import Loader from './components/atoms/Loader';
const App = () => {
  const zipCodeData = useSelector((state) => state.zipCodeData);
  const [view, setView] = useState(false);
  useEffect(()=>{
    if(zipCodeData){
      setTimeout(()=>{
        setView(true);
      },100);
    }
    else{
      setView(false);
    }
  });
  return (
    <div className="container mx-auto p-4 ">
      <Navbar/>
      <div className='h-[75vh] w-full flex flex-col justify-center items-center' >
      <ZipCodeForm />
      {view===true?<LocationInfo />:null}
      </div>
    </div>
  );
};

export default App;
