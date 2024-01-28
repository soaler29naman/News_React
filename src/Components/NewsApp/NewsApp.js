import React, { useEffect, useRef, useState } from 'react';
import News from '../News/News';
import "./NewsApp.css";

function NewsApp() {
    const apiKey = "cecd5c59abea450090a9c5ec131c5b79";
    const [newsList, setNewsList] = useState([]);
    const [query, setQuery] = useState('tesla');

    const queryInputRef = useRef(null);

    useEffect(() => {
        const fetchNews = async () => {
            const newsUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-08-27&sortBy=publishedAt&apiKey=${apiKey}`;

            try {
                const response = await fetch(newsUrl);
                const data = await response.json();
                setNewsList(data.articles);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNews();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryValue = queryInputRef.current.value;
        setQuery(queryValue);
    };

    return (
        <div className='news-app'>
            <h1 className="heading">News Daily</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="search"
                    type="text"
                    ref={queryInputRef}
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn" type="submit">Search</button>
            </form>
            <div className="newslist">
                {newsList.map((news) => (
                    <News key={news.url} news={news} />
                ))}
            </div>
        </div>
    );
}

export default NewsApp;


export default NewsApp
