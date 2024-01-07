import React, { useState, useEffect } from "react";
import { fetchDataFromFirestore } from "../pages/api/firebase.call.js";

function DisplayData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromFirestore()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>
            ------------------------------------------------------------
          </div>
          <div>{item.message}</div>
          <div>{item.timestamp}</div>
          <div>{item.user_ID}</div>
        </div>
      ))}
    </div>
  );
}

export default DisplayData;
