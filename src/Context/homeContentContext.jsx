'use client'
import React, {  createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseURL, getHeaders } from "../lib/data";
export const HomeContentContext = createContext();
function HomeContentProvider({ children }) {
  const [homeContent, setHomeContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // get data from api
  const getData = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(baseURL + "/home", {
        headers: getHeaders(),
      });
      setHomeContent(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // Helper function to format YouTube embed URL
  function convertToEmbedUrl(url) {
    const urlObj = new URL(url);
    const videoId =
      urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
    return embedUrl;
  }
  return (
    <HomeContentContext.Provider
      value={{ homeContent, isLoading, convertToEmbedUrl }}
    >
      {children}
    </HomeContentContext.Provider>
  );
}

export default HomeContentProvider;
