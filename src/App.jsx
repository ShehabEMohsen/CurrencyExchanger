import './App.css'
import Arrows from './assets/arrows.png'
import {useState, useEffect} from 'react'

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const url = `https://v6.exchangerate-api.com/v6/key/codes`;

      try{
        const response = await fetch(url);
        const result = await response.json();
        setCurrencies(result.supported_codes);
      } catch (error){
        console.error(error);
      }
    };
    fetchCurrencies();
  },[]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const url = `https://v6.exchangerate-api.com/v6/key/pair/${fromCurrency}/${toCurrency}/${amount}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        setExchangeRate(result.conversion_rate);
        setConvertedAmount(result.conversion_result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  // useEffect(() => {
  //   chrome.storage.local.get(['selectedAmount'], (result) => {
  //     if (result.selectedAmount) {
  //       setAmount(result.selectedAmount);
  //       chrome.storage.local.remove('selectedAmount');
  //     }
  //   });
  // }, []);

  return (
    <>
      <div className="extension_full">
        <div className="extension_title"><span>Currency</span> Exchanger</div>
        <div className="currency_area">
          <select value={fromCurrency} onChange = {(e) => setFromCurrency(e.target.value)}>
            {currencies.map(([code, name]) => (<> <option key={code} value={code}>{name}</option></>))}
          </select>
          <div className="curreny_inputs">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
          </div>
          <select value={toCurrency} onChange = {(e) => setToCurrency(e.target.value)}>
            {currencies.map(([code, name]) => (<> <option key={code} value={code}>{name}</option></>))}
          </select>
          <div className="curreny_inputs">
          <input type="number" value={convertedAmount || ""} readOnly></input>
        </div>
        </div>
        
        {exchangeRate && (
            <div className="one_currency">1 {fromCurrency} = {exchangeRate} {toCurrency}</div>
          )}
      </div>
    </>
  )
}

export default App
