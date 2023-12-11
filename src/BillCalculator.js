
import { useState } from "react";
export default function BillCalculator() {
  const [bill, setBill] = useState("");

 

  function handleBill(e) {
   
    setBill(e.target.value)
  }
  const [tip,setTip] = useState('')
  const [tip1,setTip1] = useState('')

  function handleTip(e) {
    
    setTip(e.target.value)
  }
  function handleTip1(e) {
    
    setTip1(e.target.value)
  }
 
  return (
    <div className="App">
      <Display addBill={handleBill}  bill={bill}/>
      <Tip bill={bill} addTip = {handleTip} tip={tip}><div>How did u like the service </div></Tip>
      <Tip bill={bill} addTip = {handleTip1} tip={tip1}><div>How did your friend like the service </div></Tip>
      <TotalBill bill={bill} tip={tip} tip1={tip1}/>
    </div>
  );
}
function Display({ addBill,bill }) {
  return <div>
    <div>How much was the bill </div>
    <input type='text' value = {bill} onChange={(e) => { addBill(e) }} />
  </div>;
}
function Tip({ children, bill,tip,addTip}) {
  
  return <div>
    {children}
    <select value = {tip} onChange={(e) => addTip(e)}>
      <option value='0'>Dissatisfied (0%)</option>
      <option value='5'>OK  (5%)</option>
      <option value='10'>Good  (10%)</option>
      <option value='20'>Amazing  (20%)</option>
    </select>
  </div>;
}
function TotalBill({bill,tip,tip1}) {
  
  let totalTip = Number(bill) * (Number(tip) + Number(tip1)) / 200
  let TotalAmnt = Number(bill) + totalTip
  return (
    <div >You pay {`$ ${TotalAmnt}`} ({`$ ${bill} + $ ${totalTip} tip`})</div>
  )
}
