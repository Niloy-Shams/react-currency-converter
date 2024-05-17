import {useId} from 'react';

const inputBox = (
    {
        label,
        amount,
        currency,
        options=[],
        inputDisabled,
        onAmountChange,
        onCurrencyChange
    }
) => {
    const id = useId();
    return (
        <div className='w-full bg-white flex p-2 rounded-lg'>
            <div className='w-1/2 flex flex-col text-left gap-2 p-1'>
              <label htmlFor={id} className='inline-block'>{label}</label>
              <input type="number" className='py-0.5' id={id} placeholder='input amount' disabled={inputDisabled} value={amount} onChange={(e)=>onAmountChange(e.target.value)}/>
            </div>
            <div className='w-1/2 flex flex-col justify-end text-right gap-2 p-1'>
              <label htmlFor="" className='inline-block'>{currency}</label>
              <select name="" id="" className='text-right' defaultChecked={currency} onChange={(e)=>onCurrencyChange(e.target.value)}>
                {
                    options.map(
                        (currency)=>{
                            return <option key={currency} value={currency}>{currency}</option>
                        }
                    )
                }
              </select>
            </div>
        </div>
    );
};

export default inputBox;