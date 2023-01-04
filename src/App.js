import './App.css';
import { useEffect, useState } from 'react';

export default function App() {

  let [data_$, setData_$] = useState([])
  let [ready_$, setReady_$] = useState(false)
  let [count_$, setCount_$] = useState(0)
  let [quote_$, setQuote_$] = useState([])

  function count(e, count_){
    
    if(e.target.id==='left_'){
      if(count_===0){
        setCount_$(100)
      }else{
        setCount_$(prev=>prev-=1)
      }
    }
    else if(e.target.id==='right_'){
      if(count_===100){
        setCount_$(0)
      }else{
        setCount_$(prev=>prev+=1)
      }
    }
  }
  
  useEffect(()=>{
    fetch('https://type.fit/api/quotes').then(res=>res.json()).then((response)=>{setData_$(response); setData_$(response); setReady_$(true)})
    .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    document.getElementById('left_').addEventListener('click',(e)=>count(e, count_$))
    document.getElementById('right_').addEventListener('click',(e)=>count(e, count_$))
  },[])
  console.log(count_$)
  return (
    <div className="App">
      <div id='left_'></div>
      {ready_$ && <SingleQuote quote={data_$[count_$].text} author={data_$[count_$].author}/>}
      <div id='right_'></div>
    </div>
  );
}

function SingleQuote({quote,author}){

  return(
    <div id={'quote_'}>
      <h3 id={'quote_body'}>"{quote}"</h3>
      <h4 id={'quote_author'}>{author}</h4>
    </div>
  )
}