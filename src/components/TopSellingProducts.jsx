import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopSellingProducts.css";

const TopSellingProducts = () => {
    const products = [
        { id: 1, image: "/images/product1.jpeg", name: "Product 1" },
        { id: 2, image: "/images/product2.jpeg", name: "Product 2" },
        { id: 3, image: "/images/product3.jpeg", name: "Product 3" }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="top-selling-container">
            <h3>🔝 Top Selling Products</h3>
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="slide">
                        <img src={product.image} alt={product.name} />
                        <p>{product.name}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TopSellingProducts;
