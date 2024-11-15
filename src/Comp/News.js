import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

function NewsPage() {
  const [mainNews, setMainNews] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const mainNewsRef = useRef(null);
  const shortNewsRef = useRef(null);

  useEffect(() => {
    fetchNewsData();
    const interval = setInterval(fetchNewsData, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(calculateShortNewsHeight);
    if (mainNewsRef.current) {
      resizeObserver.observe(mainNewsRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [mainNews]);

  const calculateShortNewsHeight = () => {
    if (mainNewsRef.current && shortNewsRef.current) {
      const mainNewsHeight = mainNewsRef.current.clientHeight;
      shortNewsRef.current.style.maxHeight = `${mainNewsHeight}px`;
      shortNewsRef.current.style.overflowY = "auto";
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("https://mongodb.webthreeworld.com/articles");
      let fetchedNewsItems = response.data;

      if (fetchedNewsItems.length > 0) {
        const latestNews = { ...fetchedNewsItems[fetchedNewsItems.length - 1] };
        latestNews.date = new Date(latestNews.date).toLocaleDateString();
        setMainNews(latestNews);

        fetchedNewsItems = fetchedNewsItems.slice(0, -1).reverse();
      }

      fetchedNewsItems.forEach((item) => {
        item.date = new Date(item.date).toLocaleDateString();
      });

      setNewsItems(fetchedNewsItems);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleNewsClick = (item) => {
    console.log("Clicked item:", item);
    setMainNews(item);
    setNewsItems((prevItems) =>
      [...prevItems.filter((news) => news.title !== item.title), mainNews].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    );

    if (mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log("Main News Updated:", mainNews);
  }, [mainNews]);

  const shortNewsItems = newsItems.map((item, index) => (
    <li key={index} className="mb-4">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          <a
            href="#"
            className="hover:text-blue-500"
            onClick={() => handleNewsClick(item)}
          >
            {item.title}
          </a>
        </h3>
        <div className="mb-2">
          <img
            src={`https://mongodb.webthreeworld.com${item.image}`}
            alt={item.title}
            className="w-full h-auto rounded-lg object-cover"
            style={{ maxHeight: "200px" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "placeholder-image-url";
            }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">{item.date}</p>
        <a
          href="#"
          className="text-sm text-blue-500 hover:underline"
          onClick={() => handleNewsClick(item)}
        >
          Read More
        </a>
      </div>
    </li>
  ));

  return (
    <>
    
   
    <Helmet>
    <title>Read Daily updates on global crypto adoption | Web3 World</title>
    <meta name="description" content={`Read all cryptocurrency latest articles on the crypto community and also check
global crypto adoption`} />
  </Helmet>

    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main News Section */}
      <div className="lg:w-4/5 flex-shrink-0 mt-4 mb-4 overflow-hidden">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md h-full">
          <div ref={mainNewsRef} className="max-h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 p-6">
              {mainNews?.title || "Loading..."}
            </h1>
            <div className="flex justify-center items-center mt-2">
              <img
                src={`https://mongodb.webthreeworld.com${mainNews?.image}`}
                alt={mainNews?.title}
                className="w-full h-full ml-4 mr-4 rounded-lg object-cover"
                style={{ maxHeight: "500px", maxWidth: "666px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "placeholder-image-url";
                }}
              />
            </div>
            <div className="p-6">
              {mainNews && (
                <div>
                  <p className="text-lg text-gray-700 mb-4">
                    {mainNews.content}
                  </p>
                  <p className="text-sm text-gray-600">
                    Posted on {mainNews.date}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Short News Section */}
      <div className="lg:w-1/5 bg-white rounded-lg shadow-md lg:-ml-10 mt-6 lg:mt-4 lg:mb-4 overflow-hidden">
        <div
          ref={shortNewsRef}
          className="p-3 flex-grow overflow-y-auto short-news"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent News</h2>
          <ul className="space-y-4">{shortNewsItems}</ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default NewsPage;
