import {useState, useEffect} from "react";
import DisplayExchangeRate from "./DisplayExchangeRate";
import axios from "axios";
function Converter() {
  const [currencies, setCurrencies]=useState({})

  const key = "15d740da79491ba97eb0247056657ffe4c785dbd";

  const listURL =  `https://api.getgeoapi.com/v2/currency/list?api_key=${key}&format=json`

  useEffect(() => {
    axios.get(`${listURL}/dshhgkhk`).then((response) => {
      console.log(response.data.currencies);
      setCurrencies(response.data.currencies)
    }).catch(error => {
      console.log("error is "+error);
    });
  }, []);

  return (
    <div className="converter">
      <h1>Convert currency!</h1>
      <div className="input-area">
        <table>
          <tbody>
            <tr>
              <td>From currency</td>
              <td>
                <input type="number" value={""} name="from-curr-input"></input>
              </td>
              <td>
                <select className="curr-option" value={""} name="from-curr-options">
                  {Object.values(currencies).sort().map((curr, _index) => <option key={_index}>{curr}</option>)}
                </select>
              </td>
            </tr>
            <tr>
              <td>To currency</td>
              <td>
                <input type="number" value={""} name="to-curr-input"></input>
              </td>
              <td>
                <select className="curr-option" value={""} name="to-curr-options">
                  {Object.values(currencies).sort().map((curr, _index) => <option key={_index}>{curr}</option>)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DisplayExchangeRate />
    </div>
  );
}

export default Converter;
