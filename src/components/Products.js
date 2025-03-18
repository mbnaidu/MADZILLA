import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    { id: 1, src: process.env.PUBLIC_URL + "/assets/Green.png", alt: "Green" },
    { id: 2, src: process.env.PUBLIC_URL + "/assets/Red.png", alt: "Red" },
    { id: 3, src: process.env.PUBLIC_URL + "/assets/White.png", alt: "White" },
    { id: 4, src: process.env.PUBLIC_URL + "/assets/Blue.png", alt: "Blue" },
];

function Products() {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box
            id="products"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: { xs: "20px", md: "0px" },
                }}
            >
                {/* Left Section - Product Info */}
                <Box
                    sx={{
                        flex: 1,
                        maxWidth: { xs: "100%", md: "40%" },
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: { xs: "20px", md: "40px" },
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            mb: 2,
                            fontSize: { xs: "24px", md: "42px" },
                            textAlign: "center",
                        }}
                    >
                        HUMIDIFIER
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            fontSize: { xs: "14px", md: "18px" },
                            textAlign: "center",
                            color: "#ccc",
                        }}
                    >
                        Improve air quality and breathe easier with our smart humidifier. It helps
                        maintain ideal humidity levels, reduces dryness, and promotes a healthier environment.
                        Perfect for bedrooms, offices, and living spaces.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#4262ff",
                            color: "#fff",
                            fontSize: { xs: "14px", md: "16px" },
                            padding: { xs: "8px 16px", md: "12px 24px" },
                            textTransform: "uppercase",
                            "&:hover": { backgroundColor: "#4262ff" },
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                        href="https://www.amazon.com"
                        target="_blank"
                    >
                        <ShoppingCartIcon />
                        Buy on Amazon
                    </Button>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: { xs: 3, md: 0 },
                    }}
                >
                    <Box sx={{ width: "80%", maxWidth: "500px" }}>
                        <Slider {...settings}>
                            {images.map((image) => (
                                <Box key={image.id} sx={{ display: "flex", justifyContent: "center" }}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        style={{ width: "100%", borderRadius: "10px" }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Products;
