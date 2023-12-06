import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [result, setResult] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setResult(data.rates[toCurr]);
        setIsLoading(false);
        //we do data.rates[toCurr] to get the value of the toCur currency. its important to examine what data actually holds in our console!
      }
      if (toCurr === fromCurr) {
        setIsLoading(false);
        return setResult(amount);
      }
      convert();
    },
    [amount, fromCurr, toCurr]
  );
  //by specifying the states in the dependency array, the useEffect will get triggered everytime that state changes.

  //in controlled elements, the value is bound to a state variable. This means that the inputs value is always in sync with the React state.
  //controlled elements have a change handler (e.g. onChange for an <input> which is triggered on every input change. This handler is responsible for updating the state, thereby updating the value of the component.
  //controlled elements are typically used in <input>, <textarea>, and <select>

  //Handling Async Operations: useEffect itself cannot be marked as async because it expects a cleanup function or nothing to be returned, not a Promise.
  //However, you often need to perform asynchronous operations (like API calls) in effects. To handle this, you define an async function inside the useEffect and then call it.
  //each time to amount or fromCur or toCur changes, then our effect will be synchronized with these 3 variables

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurr}
        onChange={(event) => setFromCurr(event.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurr}
        onChange={(e) => setToCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result}
        {toCurr}
      </p>
    </div>
  );
}
