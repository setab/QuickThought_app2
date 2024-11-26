import { useState } from 'react'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

    <ul className="steps steps-vertical">
  <li className="step step-primary">Register</li>
  <li className="step step-primary">Choose plan</li>
  <li className="step">Purchase</li>
  <li className="step">Receive Product</li>
</ul>
    </>
  )
}

export default App
