import { useState, useEffect } from "react";
import DisplayExchangeRate from "./DisplayExchangeRate";
import axios from "axios";

function Converter() {
  //states
  const [currencies, setCurrencies] = useState({});
  const [fromCurr, setFromCurr] = useState("Euro");
  const [toCurr, setToCurr] = useState("Bangladeshi taka");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionFactor, setConversionFactor]= useState(0);

  //api key, i should have kept it in a .env file, but wont be hidden really so i didn't bother
  const key = '091ddf555e7419eb35f78529bf312f4ed648f88e'
  
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
  const convert = () => {
    const fromCurrCode = Object.keys(currencies).find(
      (key) => currencies[key] === fromCurr
    );
    const toCurrCode = Object.keys(currencies).find(
      (key) => currencies[key] === toCurr
    );
    const conversionURL = `https://api.getgeoapi.com/v2/currency/convert?api_key=${key}&from=${fromCurrCode}&to=${toCurrCode}&amount=${amount}&format=json`;
    console.log(conversionURL);
    axios
      .get(`${conversionURL}`)
      .then((response) => {
        //console.log(response.data.rates[`${toCurrCode}`]["rate_for_amount"]);
        setConversionFactor(response.data.rates[`${toCurrCode}`]["rate"])
        setConvertedAmount(
          response.data.rates[`${toCurrCode}`]["rate_for_amount"]
        );
      })
      .catch((error) => {
        console.log("error while conversion is " + error);
      });
  };

  return (
    <div className="converter">
      <h1>Convert currency!</h1>
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
                    setFromCurr(e.target.value)
                    setConversionFactor(0)
                  }}
                >
                  {Object.values(currencies)
                    .sort()
                    .map((curr, _index) =>
                      curr !== toCurr ? (
                        <option key={_index}>{curr}</option>
                      ) : (
                        null
                      )
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
                    setToCurr(e.target.value)
                    setConversionFactor(0)
                  }}
                >
                  {Object.values(currencies)
                    .sort()
                    .map((curr, _index) =>
                      curr !== fromCurr ? (
                        <option key={_index}>{curr}</option>
                      ) : (
                        null
                      )
                    )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="convert-btn" onClick={convert}>
          Convert
        </button>
      </div>
      <DisplayExchangeRate rate={conversionFactor} fromCurr={fromCurr} toCurr={toCurr}/>
    </div>
  );
}

export default Converter;
