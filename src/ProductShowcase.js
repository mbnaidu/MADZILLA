import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Amazon icon

// List of available 3D models
const models = [
    { id: 1, path: process.env.PUBLIC_URL + "/assets/modelGreen.glb", name: "Green" },
    { id: 2, path: process.env.PUBLIC_URL + "/assets/modelRed.glb", name: "Red" },
    { id: 3, path: process.env.PUBLIC_URL + "/assets/modelWhite.glb", name: "White" },
    { id: 4, path: process.env.PUBLIC_URL + "/assets/modelBlue.glb", name: "Blue" },
];

// Component to load a 3D model
const ModelViewer = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} position={[-150, -250, 0]} rotation={[0, 1.4, 0.4]} scale={5} />;
};

const ProductShowcase = () => {
    const [selectedModel, setSelectedModel] = useState(models[0]); // Default model

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
                alignItems: "center",
                justifyContent: "center",
                height: "100vh", // Full viewport height
                backgroundColor: "#000",
                color: "#fff",
                padding: { xs: "20px", md: "0px" }, // Padding only on small screens
            }}
        >
            {/* Left Section - Product Info */}
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    maxWidth: { xs: "100%", md: "40%" },
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // Center content vertically
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

                {/* Amazon Buy Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#FFA41C",
                        color: "#fff",
                        fontSize: { xs: "14px", md: "16px" },
                        padding: { xs: "8px 16px", md: "12px 24px" },
                        textTransform: "uppercase",
                        "&:hover": { backgroundColor: "#FF8C00" },
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

            {/* Right Section - 3D Model */}
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    height: "100%", // Ensure it fills full height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: { xs: 3, md: 0 }, // Add margin on mobile to separate sections
                }}
            >
                {/* 3D Model Canvas */}
                {/* Model Name Selector */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        maxWidth: "90vw", // Prevent overflow on small screens
                        paddingX: 2, // Add padding to prevent cut-off
                    }}
                >
                    {models.map((model) => (
                        <Typography
                            key={model.id}
                            variant="h6"
                            sx={{
                                cursor: "pointer",
                                fontWeight: selectedModel.id === model.id ? "bold" : "normal",
                                color: selectedModel.id === model.id ? model.name : "#ccc",
                                textDecoration: "none",
                                transition: "color 0.3s",
                                padding: "5px 10px",
                                fontSize: { xs: "14px", md: "18px" },
                                whiteSpace: "nowrap", // Prevent text wrapping
                            }}
                            onClick={() => setSelectedModel(model)}
                        >
                            {model.name}
                        </Typography>
                    ))}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: "60vh", md: "100%" }, // Adjust height on mobile
                        background: "#000",
                        borderRadius: "10px",
                        boxShadow: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Canvas
                        style={{ width: "100%", height: "100%" }} // Full width & height
                        camera={{ position: [10, 360, -400], fov: 50 }}
                    >
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Environment preset="sunset" />
                        <ModelViewer modelPath={selectedModel.path} />
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </Box>

            </Box>
        </Box>
    );
};

export default ProductShowcase;
