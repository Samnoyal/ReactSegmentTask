import './App.css';
import React from "react";
import ViewSegment from "./Components/ViewSegment";

//global context
import { SegmentProvider } from "./Components/SegmentContext";

const App = () => {
  return (
    <SegmentProvider>
      <ViewSegment />
    </SegmentProvider>
  );
};

export default App;
