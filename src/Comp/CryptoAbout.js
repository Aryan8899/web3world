import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoAbout = ({ selectedCrypto }) => {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      setIsLoading(true);
      try {
        // Adjust the cryptoId based on the selectedCrypto value
        let cryptoId = selectedCrypto;
        if (selectedCrypto === "bnb") {
          cryptoId = "binancecoin";
        } else if (selectedCrypto === "usdc") {
          cryptoId = "usd-coin";
        } else if (selectedCrypto === "xrp") {
          cryptoId = "ripple";
        } else if (selectedCrypto === "toncoin") {
          cryptoId = "the-open-network";
        }
        else if (selectedCrypto === "avalanche") {
          cryptoId = "avalanche-2";
        }
        else if(selectedCrypto === "polkadot-new"){
          cryptoId = "polkadot";
        }
        else if (selectedCrypto === "unus-sed-leo"){
          cryptoId = "leo-token";
        }
        else if (selectedCrypto === "multi-collateral-dai"){
          cryptoId = "dai";
        }
        else if (selectedCrypto === "near-protocol"){
          cryptoId = "near";
        }
        else if (selectedCrypto === "polygon"){
          cryptoId = "matic-network";
        }
        
        
        
        


        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
        setAboutData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setError("Failed to load about data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedCrypto) {
      fetchAboutData();
    }
  }, [selectedCrypto]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!aboutData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About {aboutData.name}</h2>
      <p className="mb-4" dangerouslySetInnerHTML={{ __html: aboutData.description?.en || "Description not available" }}></p>
      <div className="mb-4">
        <h4 className="font-semibold">Homepage:</h4>
        {aboutData.links?.homepage[0] && (
          <a href={aboutData.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {aboutData.links.homepage[0]}
          </a>
        )}
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Official Forum URL:</h4>
        {aboutData.links?.official_forum_url[0] && (
          <a href={aboutData.links.official_forum_url[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {aboutData.links.official_forum_url[0]}
          </a>
        )}
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Blockchain Site:</h4>
        {aboutData.links?.blockchain_site[0] && (
          <a href={aboutData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {aboutData.links.blockchain_site[0]}
          </a>
        )}
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Github Repository:</h4>
        {aboutData.links?.repos_url.github[0] && (
          <a href={aboutData.links.repos_url.github[0]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {aboutData.links.repos_url.github[0]}
          </a>
        )}
      </div>
    </div>
  );
};

export default CryptoAbout;
