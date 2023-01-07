import './App.css';
import React,{ useEffect, useState,useRef } from 'react';

export default function App() {

  let [data_$, setData_$] = useState([])
  let [ready_$, setReady_$] = useState(false)
  let [count_$, setCount_$] = useState(0)
  let [state_$, setState_$] = useState(false)
  let quote_ref = useRef(null)

  useEffect(()=>{
    // fetch Quotes from the API:
    fetch('https://type.fit/api/quotes').then(res=>res.json()).then((response)=>{setData_$(response); setReady_$(true)})
    .catch(err=>console.log(err))
  },[])

  useEffect(()=>{
    // Add handlers to the left&right dom divs those change the quote /forward&backward/
    document.getElementById('leftSide').addEventListener('click',(e)=>clickHandler(e,count_$))
    document.getElementById('rightSide').addEventListener('click',(e)=>clickHandler(e,count_$))
  },[])
  useEffect(()=>{console.log(count_$)},[count_$])
  function clickHandler(e){
    // Handler after clicking on right- and left-div
    setState_$(true)
    if(e.target.id==='rightSide'){
      let quote_Element = quote_ref.current
      quote_Element.addEventListener('transitionend',forward)
    }
    if(e.target.id==='leftSide'){
        let quote_Element = quote_ref.current
        quote_Element.addEventListener('transitionend',backward)
    }
  }

  function forward () {
    // forward handler
    let quote_Element = quote_ref.current
    setState_$(false)
    setCount_$(p=>p+=1)
    quote_Element.removeEventListener('transitionend',forward,false)
  }
  function backward () {
    // backward handler
    let quote_Element = quote_ref.current
    setState_$(false)
    setCount_$(p=>p-=1)
    quote_Element.removeEventListener('transitionend',backward,false)

  }

  return (
    <div className="App">
      <div id='leftSide'></div>
        {ready_$ && 
          <ONEQUOTE 
          quote={data_$[Math.abs(count_$)].text} 
          author={data_$[Math.abs(count_$)].author}
          hide={state_$}
          ref_={quote_ref} />
        }
      <div id='rightSide'></div>
    </div>
  );
}

function ONEQUOTE({quote,author,hide,ref_}){
  // JSX returns a single quote box
  return(
    <div id={'quote_'} ref={ref_} className={hide?'hide':'show'}>
      <h3 id={'quote_body'}>"{quote}"</h3>
      <h4 id={'quote_author'}>{author}</h4>
    </div>
  )
}