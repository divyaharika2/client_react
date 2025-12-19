import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../api';
import { Oval } from 'react-loader-spinner';

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const scrollRef = useRef(null);
  const [loding, setLoding] = useState(true)

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      console.log("this is api Data", newData)
      setLoding(false)
    } catch (error) {
      alert("Failed to fetch data");
      console.error("failed to fetch data");
      setLoding(true)
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      {loding && <>
        <div className="loader">
          Loading
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>

      </>

      }
      <h2 className="chainHeading">Top restaurant chains in Hyderabad</h2>

      <section className="chainWrapper">
        <button className="scrollBtn left" onClick={scrollLeft}>←</button>

        <div className="chainSection" ref={scrollRef}>
          {vendorData.vendors && vendorData.vendors.map((vendor, index) => (
            <div className="vendorBox" key={index}>
              {vendor.firm.map((item, idx) => (
                <div key={idx}>
                  <div className="firmName">{item.firmName}</div>
                  <div className="firmImage">
                    <img src={`${API_URL}/uploads/${item.image}`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="scrollBtn right" onClick={scrollRight}>→</button>
      </section>
    </>
  );
};

export default Chains;