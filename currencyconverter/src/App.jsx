import { useState } from 'react'
import Input from './components/input.jsx';
import useCurrencyInfo from './hooks/useCurrencyinfo';

function App() {
  const [Amount, setAmount] = useState(0);
  const [from, setfrom] = useState("usd");
  const [To, setTo] = useState("inr");
  const [convertedAmount, setconvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setconvertedAmount(Amount * currencyInfo[To]);
  };

  const swap = () => {
    const temp = from;
    setfrom(To);
    setTo(temp);
    setAmount(convertedAmount);
    setconvertedAmount(Amount);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://imgs.search.brave.com/HY9s14l89qYWMmD3EWr2N9OrFjUqLn67_smeXz3L0wM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA1/OTE2NTQyL3Bob3Rv/L2N1cnJlbmN5LWV4/Y2hhbmdlLW5vdGlj/ZS1ib2FyZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9amEw/aXZWaVVZVHVQOE9E/ek5JR2ZMbUZZSVpo/QXFkT295NEZXSkh2/OVVOZz0')`,
        }}>
        <div className='widthw-full'>
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

            <form onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}>
              <div className="w-full mb-1">
                <Input
                  label="from"
                  amount={Amount}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => setfrom(currency)}
                  selectCurrency={from}
                  currencyOptions={options}
                />
              </div>

              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>

              <div>
                <Input
                  label="to"
                  amount={convertedAmount}
                  
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={To}
                  currencyOptions={options}
                  amountDisable
                />
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {To.toUpperCase()}
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default App;
