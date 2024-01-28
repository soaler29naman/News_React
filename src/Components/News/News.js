import React from 'react'
import './News.css'
function News({news}) {
  return (
    <div className="news-card">
        <img src={news.urlToImage} alt={news.title} />
        <h2>{news.title}</h2>
        <p>{news.description}</p>
        <div className="btn">

        <button className="btn-read-more" onClick={()=>window.open(news.url)}>Read More</button>

        </div>
    </div>
  )
}

export default News