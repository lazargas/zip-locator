import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData, setZipCodeData } from "../../redux/actions";
import Error from '../atoms/Error';

const ZipCodeForm = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await fetch(`https://api.zippopotam.us/in/${zipCode}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(setZipCodeData(data));
        dispatch(setData(true));
        setError("");
      } else {
        throw new Error("Invalid Pincode");
      }
    } catch (error) {
      setError("Invalid Pincode");
    }
  };

  const handleReset = () => {
    setZipCode("");
    setError("");
    dispatch(setZipCodeData(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchData();
  };

  return (
    <form className="max-w-sm m-auto p-4 bg-white rounded" onSubmit={handleSubmit} onReset={handleReset}>
      <input
        type="text"
        placeholder="Enter postal code"
        className="w-[25vw] p-4 mb-2 border rounded"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <div className="flex w-[25vw] gap-4">
        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700">
          Fetch Data
        </button>
        <button type="reset" className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700">
          Reset
        </button>
      </div>
      {error && <Error error={error} />}
    </form>
  );
};

export default ZipCodeForm;
