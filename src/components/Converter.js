import { useState, useEffect } from "react";
import {
  fixAmount,
  fixConversionFacotr,
  fixConvertedAmount,
  fixFromCurr,
  fixToCurr,
} from "../Reducer/dataReducer";
import axios from "axios";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

function Converter() {
  //dispatch
  const dispatch = useDispatch();
  //states
  const [currencies, setCurrencies] = useState({});
  const [fromCurr, setFromCurr] = useState("Euro");
  const [toCurr, setToCurr] = useState("Bangladeshi taka");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionFactor, setConversionFactor] = useState(0);

  //api key, i should have kept it in a .env file, but wont be hidden really so i didn't bother
  const key = "091ddf555e7419eb35f78529bf312f4ed648f88e";

  //this react hook allows for side loading the following block of code every time any part of the page is rerendered
  useEffect(() => {
    const listURL = `https://api.getgeoapi.com/v2/currency/list?api_key=${key}&format=json`;
    axios
      .get(`${listURL}`)
      .then((response) => {
        //console.log(response.data.currencies);
        setCurrencies(response.data.currencies);
      })
      .catch((error) => {
        console.log("error is " + error);
      });
  }, []);

  //this function is triggered when the convert button is pressed
  const convert = async () => {
    dispatch(fixToCurr(toCurr));
    dispatch(fixFromCurr(fromCurr));
    dispatch(fixAmount(amount));
    const fromCurrCode = Object.keys(currencies).find(
      (key) => currencies[key] === fromCurr
    );
    const toCurrCode = Object.keys(currencies).find(
      (key) => currencies[key] === toCurr
    );
    const conversionURL = `https://api.getgeoapi.com/v2/currency/convert?api_key=${key}&from=${fromCurrCode}&to=${toCurrCode}&amount=${amount}&format=json`;
    // console.log(conversionURL);
    const res = await axios.get(`${conversionURL}`);
    setConversionFactor(res.data.rates[`${toCurrCode}`]["rate"]);
    dispatch(fixConversionFacotr(res.data.rates[`${toCurrCode}`]["rate"]));
    setConvertedAmount(res.data.rates[`${toCurrCode}`]["rate_for_amount"]);
    dispatch(fixConvertedAmount(res.data.rates[`${toCurrCode}`]["rate_for_amount"]));
  };

  return (
    <>
      <div className="input-area">
        <table>
          <tbody>
            <tr>
              <td>From currency</td>
              <td>
                <input
                  type="number"
                  value={amount}
                  name="from-curr-input"
                  onChange={(e) => setAmount(e.target.value)}
                ></input>
              </td>
              <td>
                <select
                  className="curr-option"
                  value={fromCurr}
                  name="from-curr-options"
                  onChange={(e) => {
                    setFromCurr(e.target.value);
                    setConversionFactor(0);
                  }}
                >
                  {Object.values(currencies)
                    .sort()
                    .map((curr, _index) =>
                      curr !== toCurr ? (
                        <option key={_index}>{curr}</option>
                      ) : null
                    )}
                </select>
              </td>
            </tr>
            <tr>
              <td>To currency</td>
              <td>
                <input
                  type="number"
                  value={convertedAmount}
                  name="to-curr-input"
                  disabled={true}
                ></input>
              </td>
              <td>
                <select
                  className="curr-option"
                  value={toCurr}
                  name="to-curr-options"
                  onChange={(e) => {
                    setToCurr(e.target.value);
                    setConversionFactor(0);
                  }}
                >
                  {Object.values(currencies)
                    .sort()
                    .map((curr, _index) =>
                      curr !== fromCurr ? (
                        <option key={_index}>{curr}</option>
                      ) : null
                    )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <Button variant="contained" color="success" onClick={convert}>
          Convert
        </Button>
      </div>
    </>
  );
}

export default Converter;
