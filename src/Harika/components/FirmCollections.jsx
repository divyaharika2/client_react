import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

const FirmControllers = ({ searchTerm }) => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');

  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors || []);
      console.log("firmData", newFirmData.vendors);
    } catch (error) {
      alert("Firm data not fetched");
      console.error("Error fetching firm data:", error);
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  // ✅ Filter firms by region AND search term
  const filteredFirmData = firmData
    .map(vendor => ({
      ...vendor,
      firm: vendor.firm?.filter(item =>
        (selectedRegion === 'All' || item.region?.includes(selectedRegion)) &&
        (searchTerm === "" || item.firmName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }))
    .filter(vendor => vendor.firm && vendor.firm.length > 0);

  return (
    <>
      <h3 className="firmHeading">
        Restaurants with online food delivery in Hyderabad
      </h3>

      <div className="filterButton">
        {['All', 'south-indian', 'north-indian', 'chinese', 'italian'].map(region => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={selectedRegion === region ? "activeFilter" : ""}
          >
            {region}
          </button>
        ))}
      </div>

      <section className="firmSection">
        {filteredFirmData.length > 0 ? (
          filteredFirmData.map((vendor, index) => (
            <div className="vendorBox" key={index}>
              {vendor.firm?.map((item, idx) => (
                <Link to={`/products/${item._id}/${item.firmName}`} key={idx} className="link">
                  <div className="firmCard">
                    <div className="firmImages">
                      <img src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                      <div className="firmoffer">{item.offer}</div>
                    </div>
                    <div className="firmName">{item.firmName}</div>
                    <div className="firmregion">
                      <h4>{item.region?.join(', ')}</h4>
                    </div>
                    <div className="firmarea">
                      <h4>{item.area}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </section>
    </>
  );
};

export default FirmControllers;