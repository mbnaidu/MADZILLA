import { Box, Chip, Grid2, Typography } from '@mui/material';
import React, { useState } from 'react';
import SpaIcon from "@mui/icons-material/Spa";
import VerifiedIcon from "@mui/icons-material/Verified";
import SwapHorizIcon from "@mui/icons-material/SwapHorizSharp";
const InfoChips = () => {
    const infoData = [
        {
            title: "Humidifier Benefits",
            content:
                "Maintains optimal humidity, prevents dry skin, and reduces respiratory issues.",
        },
        {
            title: "Energy Efficiency",
            content:
                "Consumes low power while providing maximum performance for everyday use.",
        },
        {
            title: "Smart Features",
            content:
                "Integrated with smart technology for remote control and monitoring via mobile app.",
        },
        {
            title: "Easy Maintenance",
            content:
                "Designed for hassle-free cleaning and part replacement, ensuring longevity.",
        },
    ];
    const [selectedChip, setSelectedChip] = useState(0);
    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    mb: 2,
                    paddingX: 1,
                    "&::-webkit-scrollbar": { display: "none" },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                {infoData.map((item, index) => (
                    <Chip
                        key={item.title}
                        label={item.title}
                        onClick={() => setSelectedChip(index)}
                        clickable
                        variant={selectedChip === index ? "filled" : "outlined"}
                        color="info"
                        sx={{ flexShrink: 0, fontWeight: "bold" }}
                    />
                ))}
            </Box>
            <Box
                sx={{
                    backgroundColor: "#f7f7f7",
                    borderRadius: 2,
                    p: 2,
                    boxShadow: 3,
                    textAlign: "left",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2F4F4F", mb: 1 }}>
                    {infoData[selectedChip].title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>
                    {infoData[selectedChip].content}
                </Typography>
            </Box>
        </Box>
    );
}
function About() {
    return (
        <Box
            id="about"
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#000",
                textAlign: "center",
                padding: "50px 20px",
            }}
        >
            <Typography variant="h3" sx={{ color: "#FFF", fontWeight: "bold", mb: 2 }}>
                WHY CHOOSE OUR PRODUCTS?
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "600px", color: "#FFF", mb: 5 }}>
                We offer high-quality, natural products with long-term durability and hassle-free replacement options.
            </Typography>
            <Box
                sx={{
                    mb: 5,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 4,
                    width: "100%",
                }}
            >
                <Box sx={{ width: { xs: "100%", md: "60%" }, textAlign: "center" }}>
                    <video
                        width="100%"
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        style={{
                            maxWidth: "100%",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                        }}
                    >
                        <source src={process.env.PUBLIC_URL + "/assets/product-video.mp4"} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Box>
                <Box sx={{ width: { xs: "100%", md: "40%" } }}>
                    <InfoChips />
                </Box>
            </Box>
            <Grid2 container spacing={4} justifyContent="center">
                <Grid2 xs={12} sm={4} textAlign="center">
                    <SpaIcon sx={{ fontSize: 50, color: "#4CAF50" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "#FFF" }}>
                        Natural
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FFF", mt: 1, color: "#FFF" }}>
                        Made from 100% natural ingredients, free from harmful chemicals.
                    </Typography>
                </Grid2>
                <Grid2 xs={12} sm={4} textAlign="center">
                    <VerifiedIcon sx={{ fontSize: 50, color: "#FF9800" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "#FFF" }}>
                        5+ Year Warranty
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FFF", mt: 1 }}>
                        Guaranteed durability with over 5 years of manufacturer warranty.
                    </Typography>
                </Grid2>
                <Grid2 xs={12} sm={4} textAlign="center">
                    <SwapHorizIcon sx={{ fontSize: 50, color: "#2196F3" }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "#FFF" }}>
                        Replacement Options
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FFF", mt: 1 }}>
                        Hassle-free replacement policy to ensure your satisfaction.
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default About