import { useState, useEffect} from 'react'
import backgroundImage from './assets/background.jpg'
import InputBox from './components/inputBox';

function App() {
  const [amount, setAmount] = useState(0)
  const [converted, setConverted] = useState(0);
  const [from, setFrom] = useState('BDT');
  const [to, setTo] = useState('USD');

  const [data, setData] = useState({});

  function callAPI(from){
    fetch(`https://open.er-api.com/v6/latest/${from}`)
        .then((res) => res.json())
        .then((res) => setData(res['rates']))
  }

  useEffect(
    ()=>{callAPI(from)}, [from]
  )

  const options = Object.keys(data);
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConverted(amount)
    setAmount(converted)
  }

  const convert = ()=>{
    setConverted(amount*data[to]);
  }

  return (
    <div className='h-screen w-full bg-cover bg-no-repeat flex items-center justify-center' style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className='w-full max-w-md mx-auto backdrop-blur-sm bg-white/30 p-5 rounded-lg'>
        <form>
        <InputBox
            label={"From"}
            amount={amount}
            currency={from}
            options={options}
            inputDisabled={false}
            onAmountChange={(e)=>setAmount(e)}
            onCurrencyChange={(e)=>setFrom(e)}
          />

        <div className='w-full h-2 relative'>
          <button type='button' onClick={swap} className='bg-blue-500 absolute left-1/2 text-white px-2 py-1 rounded-lg -translate-x-1/2 -translate-y-1/2'>Swap</button>
        </div>

        <InputBox
            label={"To"}
            amount={converted}
            currency={to}
            options={options}
            inputDisabled={true}
            onAmountChange={(e)=>setAmount(e)}
            onCurrencyChange={(e)=>setTo(e)}
          />

        <button type='button' onClick={convert} className='bg-blue-500 text-white px-2 py-1 rounded-lg text-center w-full mt-2'>
          Convert {from} to {to}
        </button>
        </form>
      </div>
    </div>
  )
}

export default App
