import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const limit = 50;
const App = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((json) => setItems([...items, ...json]))
      .finally(limit * page === 200 ? setHasMore(false) : setHasMore(true));
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={() => setPage(page + 1)}
      hasMore={hasMore}
      loader={
        <h4
          style={{
            position: "fixed",
            top: "0",
            left: "50vw",
            backgroundColor: "blue"
          }}>
          Loading...
        </h4>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }>
      {items.map((item) => (
        <h3 key={item.id}>
          {item.id} - {item.title}
        </h3>
      ))}
    </InfiniteScroll>
  );
};

export default App;
