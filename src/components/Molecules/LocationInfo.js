import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dynamoDB } from '../../db';
import Loader from '../atoms/Loader';

const LocationInfo = () => {
  const dispatch = useDispatch();
  const zipCodeData = useSelector((state) => state.zipCodeData);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (zipCodeData) {
      const { country, state, places } = zipCodeData;
      const placeName = places[0]['place name'];
      const pin = zipCodeData['post code'];

      const params = {
        TableName: 'zipcode',
        Item: {
          pin: pin,
          country: country,
          state: state,
          place: placeName,
        },
      };

      dynamoDB.put(params).promise()
        .then(() => setLoading(false))
        .catch(error => {
          console.error('Error saving data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [zipCodeData]);

  if (!zipCodeData || loading) {
    return <Loader />;
  }

  return <Location data={zipCodeData} />;
};

const Location = ({ data }) => {
  const { country, places } = data;
  const state = places[0].state;
  const placeName = places[0]['place name'];

  return (
    <div className="block max-w-sm p-12 bg-white border border-gray-200 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Location Information</h2>
      <p className="mb-2">
        <span className="font-semibold">Country:</span> {country}
      </p>
      <p className="mb-2">
        <span className="font-semibold">State:</span> {state}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Place Name:</span> {placeName}
      </p>
    </div>
  );
};

export default LocationInfo;
