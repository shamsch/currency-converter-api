
function DisplayExchangeRate(props) {
  let {toCurr, fromCurr, rate} = props
  return (
    <div className="exchange-rate">
      { rate? <h1>1 {fromCurr} is {rate} {toCurr}</h1> : <h1>Exchange rate for one unit will be displayed here</h1> } 
    </div>
  );
}

export default DisplayExchangeRate;