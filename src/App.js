import React, { useEffect } from "react";
import "./App.css";
import Converter from "./components/Converter";
import Navbar from "./UI/Navbar";
import AppGrid from "./UI/AppGrid";
import DisplayExchangeRate from "./components/DisplayExchangeRate";
import { useSelector } from "react-redux";

function App() {
  const {fromCurr,toCurr,conversionFactor} = useSelector((state)=> state.data)
  console.log(fromCurr,toCurr,conversionFactor)

  return (
    <div>
      <Navbar>Convert currencies!</Navbar>
      <AppGrid
        result={
          <DisplayExchangeRate
            rate={conversionFactor}
            fromCurr={fromCurr}
            toCurr={toCurr}
          />
        }
        converter = {<Converter/>}
      />
    </div>
  );
}

export default App;
