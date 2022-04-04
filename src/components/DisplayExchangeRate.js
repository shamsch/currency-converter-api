
function DisplayExchangeRate(props) {
  let {toCurr, fromCurr, rate} = props
  return (
    <>
      { rate? <p>1 {fromCurr} is {rate} {toCurr}</p> : <p>Exchange rate for one unit will be displayed here</p> } 
    </>
  );
}

export default DisplayExchangeRate;