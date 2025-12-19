import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import ItemDisplay from '../components/ItemDisplay';
import Chains from '../components/Chains';
import FirmCollections from "../components/FirmCollections";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <TopBar setSearchTerm={setSearchTerm} />
      <div className="landingSection">
        <ItemDisplay searchTerm={searchTerm} />
        <Chains />
        <FirmCollections searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default LandingPage;
