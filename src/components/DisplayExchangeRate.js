
function DisplayExchangeRate(props) {
  let {toCurr, fromCurr, rate} = props
  return (
    <div className="exchange-rate">
      { rate? <p>1 {fromCurr} is {rate} {toCurr}</p> : <p>Exchange rate for unit price will be displayed here</p> } 
    </div>
  );
}

export default DisplayExchangeRate;