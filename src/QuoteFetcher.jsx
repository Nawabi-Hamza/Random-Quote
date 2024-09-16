import React, { useEffect, useState } from 'react'
import deleteIcon from "./assets/icons8-delete-100.png"

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random"

function QuoteFetcher() {
    const [ data,setData ] = useState([{ text: "All know the way; few actually walk it.", author: "Bodhidharma" }])
    const [ loading,setLoading ] = useState(false)

    async function fetchQuote(){
        setLoading(true)
        const response = await fetch(RANDOM_QUOTE_URL)
        const jsonResponse = await response.json()
        const newQuote = jsonResponse.quote
        setData([ newQuote, ...data ])
        setLoading(false)
    }

    function handleDelete(idx){
        const newData = [...data]
        newData.splice(idx,1)
        setData(newData)
    }
  return (
    <div> 
        <h2>Quote of the Day</h2>
        <div className='headerBtn'>
            <button onClick={fetchQuote}>New Quote</button> <a href="https://github.com/Nawabi-Hamza">~Hamza Nawabi</a>
        </div>
        <hr />
        {loading && <h4 className='Loader'>Loading...</h4> }
        {data.map((item,idx)=>(
            <div className='Quote' key={idx}>
                <h3>{item.text}</h3>
                <p>~{item.author}</p>
                <button className='DeleteBtn' onClick={()=> handleDelete(idx)}>
                    <img src={deleteIcon} alt="delete icon"/>
                </button>
            </div>
        ))}
    </div>
  )
}

export default QuoteFetcher