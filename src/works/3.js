import React, { useState } from "react";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequests = async (url) => {
    setIsLoading(true);

    await Promise.allSettled([fetch(url), fetch(url)]);
    console.log("Both responses were received");

    setIsLoading(false);
  };

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={() => sendRequests("http://vk.com/feed")}
        disabled={isLoading}
      >
        {isLoading
          ? "Your data is loading, w8 one moment, all good"
          : "Send Requests"}
      </button>
    </div>
  );
};
