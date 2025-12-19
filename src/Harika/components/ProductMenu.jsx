import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';
import TopBar from "./TopBar";

const ProductMenu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { firmId, firmName } = useParams();

    const productHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();

            setProducts(newProductData?.products || []);
            console.log("Products:", newProductData);
            setLoading(false);
        } catch (err) {
            console.error("Products failed to fetch:", err);
            setError("Failed to load products. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        productHandler();
    }, [firmId]); // ✅ re-fetch when firmId changes

    return (
        <>
            <TopBar />
            <h1 className="restaurantname">{firmName} Restaurant</h1>

            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <section className="productSection">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div key={item._id || item.productName} className="productCard">
                                <div className="productInfo">
                                    <div className="productName">{item.productName}</div>
                                    <div className="productDetails">
                                        <p>₹{item.price}</p>
                                        <p>{item.description}</p>
                                    </div>
                                </div>

                                <div className="productImages">
                                    <img
                                        src={`${API_URL}/uploads/${item.image}`}
                                        alt={item.productName}
                                    />
                                    <div className="productActions">
                                        <button className="addButton">
                                            <span className="plusIcon">+</span> ADD
                                        </button>
                                        {item.customisable && (
                                            <div className="customisableTag">Customisable</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available for this restaurant.</p>
                    )}
                </section>
            )}
        </>
    );
};

export default ProductMenu;