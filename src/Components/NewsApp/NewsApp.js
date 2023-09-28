import React, { useEffect, useRef, useState } from 'react'
import News from '../News/News';
import "./NewsApp.css"

function NewsApp() {
    const apikey= "cecd5c59abea450090a9c5ec131c5b79";
    const [Newslist, setNewslist] = useState([])
    const [query, setquery] = useState('tesla')
    
    const newsurl=`https://newsapi.org/v2/everything?q=${query}&from=2023-08-27&sortBy=publishedAt&apiKey=${apikey}`;

    const queryInputRef= useRef(null);

    useEffect(()=>{
        fetchData();
    }, [query]);

    async function fetchData(){
        try{
            const response= await fetch(newsurl);
        const data= await response.json();
        setNewslist(data.articles);
        }
        catch(error){
            console.log(error);
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        const queryValue= queryInputRef.current.value;
        setquery(queryValue);
    }




  return (

    <div className='news-app'>
        <h1 className="heading">News Daily</h1>
        <form onSubmit={handleSubmit}>
            <input className="search" type="text" ref={queryInputRef} placeholder="Search"/>

            <button className="btn" onClick={handleSubmit} >Search</button>

        </form>

        <div className="newslist">

            {Newslist.map((news)=>{
                return <News key={news.url} news={news}/>
            })}
        </div>
    </div>
  )
}

export default NewsApp