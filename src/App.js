import money from './img/money.png';
import './App.css';
import Currency from './Components/Currency';
import {useEffect,useState} from "react"

function App() {
  
  const [currencyChoice,setCurrencyChoice] = useState([])
  const [formCurrency,setFormCurrency] = useState("USD")
  const [toCurrency,setToCurrency] = useState("THB")

  const [amount,setAmount] = useState(1)
  const [exchangerate,setExchangerate] = useState(0)

  const [checkfromcurrency,setCheckfromcurrency] = useState(true)

  let fromamount,toamount
  
  if(checkfromcurrency){
    fromamount = amount
    toamount = (amount*exchangerate).toFixed(2)
  }else{
    toamount = amount
    fromamount = (amount/exchangerate).toFixed(2)
  }


  useEffect(()=>{
    const url ="https://api.exchangerate-api.com/v4/latest/"+formCurrency
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
            setCurrencyChoice([...Object.keys(data.rates)])
            setExchangerate(data.rates[toCurrency])}      
         )
  },[formCurrency,toCurrency])

  const amountformcurrency = (e)=>{
    setAmount(e.target.value)
    setCheckfromcurrency(true)
  }

  const amounttocurrency = (e)=>{
    setAmount(e.target.value)
    setCheckfromcurrency(false)
  }

  return (
    <div className="">
        <img src={money} className="money-img"/>
        <h1>แอฟแปลงสกุลเงินจาก (API)</h1>
        <div className="container">
          <Currency 
            currencyChoice={currencyChoice} 
            selectCurrency ={formCurrency} 
            changeCurrency = {(e)=>setFormCurrency(e.target.value)}
            amount ={fromamount}
            onChangeAmount = {amountformcurrency}
          />
          <div className="equal"> = </div>
          <Currency 
            currencyChoice={currencyChoice} 
            selectCurrency ={toCurrency} 
            changeCurrency = {(e)=>setToCurrency(e.target.value)}
            amount ={toamount}
            onChangeAmount = {amounttocurrency}
          />
        </div>
    </div>
  );
}

export default App;
