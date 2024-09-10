// src/components/SegmentContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context with default values
const SegmentContext = createContext({
  segmentName: '',
  setSegmentName: () => {},
  addedSchemas: [],
  setAddedSchemas: () => {},
  availableSchemas: [],
  setAvailableSchemas: () => {}
});

// Create a provider component
export const SegmentProvider = ({ children }) => {
  const [segmentName, setSegmentName] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ]);

  return (
    <SegmentContext.Provider
      value={{
        segmentName,
        setSegmentName,
        addedSchemas,
        setAddedSchemas,
        availableSchemas,
        setAvailableSchemas
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
};

// Custom hook to use the SegmentContext
export const useSegment = () => useContext(SegmentContext);
