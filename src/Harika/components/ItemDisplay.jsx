import React from 'react';
import { itemData } from '../data';

const ItemDisplay = () => {
  console.log("itemData:", itemData);

  return (
    <div className="itemSection">
      {itemData.length > 0 ? (
        itemData.map((item, index) => (
          <div className="gallery" key={index}>
            <img src={item.item_img} alt={item.item_name || "Food item"} />
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

export default ItemDisplay;