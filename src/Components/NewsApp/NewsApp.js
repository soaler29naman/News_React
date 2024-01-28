import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import './NewsApp.css';

const News = lazy(() => import('../News/News'));

function NewsApp() {
  const apiKey = "cecd5c59abea450090a9c5ec131c5b79";
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState('tesla');
  const [isLoading, setIsLoading] = useState(false);

  const queryInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const newsUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-12-28&sortBy=publishedAt&apiKey=${apiKey}`;

      try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        setNewsList(data.articles);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <div className="btnw">
          <button className="btn" type="submit">Search</button>
        </div>
      </form>
      <div className="newslist">
        <Suspense fallback={<p>Loading...</p>}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            newsList.map((news) => (
              <News key={news.url} news={news} />
            ))
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default NewsApp;
