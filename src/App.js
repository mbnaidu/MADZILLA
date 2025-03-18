import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Container,
    useMediaQuery,
    useTheme,
    Grid2,
    Chip,
    TextField
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import SpaIcon from "@mui/icons-material/Spa";
import VerifiedIcon from "@mui/icons-material/Verified";
import SwapHorizIcon from "@mui/icons-material/SwapHorizSharp";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
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
// InfoChips component defined above
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

const App = () => {
    const modelPath = process.env.PUBLIC_URL + "/assets/model.glb";
    const { scene } = useGLTF(modelPath);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navItems = ["About", "Products", "Contact"];
    const [modelScaleFlag, setModelScaleFlag] = useState(window.innerWidth < 600);
    const targetRotation = 2; // Target final rotation angle
    const [rotationY, setRotationY] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
    const [selectedModel, setSelectedModel] = useState(models[0]); // Default model
    useEffect(() => {
        const handleResize = () => {
            setModelScaleFlag(window.innerWidth < 600);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (!isRotating) return;
        const interval = setInterval(() => {
            setRotationY((prev) => {
                if (prev >= targetRotation) {
                    clearInterval(interval);
                    setIsRotating(false);
                    return targetRotation; // Stop exactly at target rotation
                }
                return prev + 0.05; // Smoothly rotate
            });
        }, 50);
        return () => clearInterval(interval);
    }, [isRotating]);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileOpen(false);
    };
    return (
        <>
            <AppBar position="sticky" sx={{ background: "#fff" }}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            cursor: "pointer",
                            color: "#000",
                            letterSpacing: "0.5rem",
                            fontWeight: "900",
                        }}
                        onClick={() => scrollToSection("home")}
                    >
                        MADZILLA
                    </Typography>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item}
                                sx={{ color: "#000", fontSize: "18px", fontWeight: "600" }}
                                onClick={() => scrollToSection(item.toLowerCase())}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        color="black"
                        edge="end"
                        sx={{ display: { md: "none" } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{ "& .MuiDrawer-paper": { width: "250px", backgroundColor: "#fff" } }}
            >
                <List>
                    {navItems.map((item) => (
                        <ListItem button key={item} onClick={() => scrollToSection(item.toLowerCase())}>
                            <ListItemText primary={item} sx={{ textAlign: "center", color: "#000" }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Container
                sx={{
                    minHeight: "100vh",
                    padding: "0px !important",
                    margin: "0px",
                    maxWidth: "100% !important",
                }}
            >
                {isMobile ? (
                    <Box
                        id="home"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            background: "#fff",
                            minHeight: "100vh",
                            paddingTop: "20px",
                        }}
                    >
                        <Box sx={{ width: "100%", height: "90vh" }}>
                            <Canvas
                                style={{ width: "100%", height: "100%" }}
                                camera={{ position: [10, 360, -400], fov: 50 }}
                            >
                                <ambientLight intensity={0.7} />
                                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                                <Environment preset="sunset" />
                                <primitive
                                    object={scene}
                                    position={[modelScaleFlag ? -160 : -110, -100, 0]}
                                    rotation={[0, 2, 0]}
                                    scale={1.6}
                                />
                                <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={1.5} />
                            </Canvas>
                        </Box>
                        {!modelScaleFlag && (
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: "15vw",
                                    textTransform: "uppercase",
                                    letterSpacing: "1.5vw",
                                    color: "#000",
                                    textShadow: `
                                        10px 10px 20px rgba(0, 0, 0, 0.6), 
                                        20px 20px 40px rgba(0, 0, 0, 0.4),
                                        30px 30px 60px rgba(0, 0, 0, 0.2)
                                    `,
                                    mt: 2,
                                }}
                            >
                                MADZILLA
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Box
                        id="home"
                        sx={{
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#000",
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Canvas
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: 1,
                            }}
                            camera={{ position: [10, 360, -400], fov: 50 }}
                        >
                            <ambientLight intensity={0.7} />
                            <directionalLight position={[10, 10, 5]} intensity={1.5} />
                            <Environment preset="sunset" />
                            <primitive
                                object={scene}
                                position={[modelScaleFlag ? -160 : -110, -100, 0]}
                                rotation={[0, rotationY, 0]} // Rotating smoothly until target
                                scale={1.6}
                            />
                            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={1.5} />
                        </Canvas>
                        <Typography
                            variant="h1"
                            sx={{
                                position: "absolute",
                                fontSize: { xs: "12vw", sm: "15vw" },
                                textTransform: "uppercase",
                                letterSpacing: { xs: "1vw", sm: "1.5vw", md: "2vw", lg: "2.5vw" },
                                color: "#000",
                                textShadow: `
                                                10px 10px 20px rgba(0, 0, 0, 0.6), 
                                                20px 20px 40px rgba(0, 0, 0, 0.4),
                                                30px 30px 60px rgba(0, 0, 0, 0.2)
                                            `,
                            }}
                        >
                            MADZILLA
                        </Typography>
                    </Box>
                )}
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
                        {/* <Grid2 xs={12} sm={3} textAlign="center">
                            <ShoppingCartIcon sx={{ fontSize: 50, color: "#FF5733" }} />
                            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, color: "#FFF" }}>
                                Amazon
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#FFF", mt: 1 }}>
                                Buy now from Amazon with fast shipping and easy returns.
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#FF9900",
                                    color: "#fff",
                                    "&:hover": { backgroundColor: "#E68900" },
                                }}
                                href="https://www.amazon.com"
                                target="_blank"
                            >
                                Shop Now
                            </Button>
                        </Grid2> */}
                    </Grid2>
                </Box>
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
                </Box>
                <Box
                    id="contact"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#b0b0b0",
                    }}
                >

                    <Box
                        sx={{
                            backgroundColor: "#0b0e17",
                            color: "white",
                            py: 6, // Added padding for better spacing
                            width: "100%",
                        }}
                    >
                        <>
                            {/* Contact CTA */}
                            <Box
                                textAlign="center"
                                mb={4}
                                sx={{
                                    px: { xs: 2, md: 6 },
                                    maxWidth: { xs: "100%", md: "100%" },
                                    margin: "auto",
                                }}
                            >
                                <Typography variant="h4" fontWeight="bold" gutterBottom>
                                    Have a Question?
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                    Reach out to our team and let’s discuss how we can help you.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        backgroundColor: "#4262ff",
                                        borderRadius: "20px",
                                        px: 4,
                                        fontSize: { xs: "0.9rem", md: "1rem" },
                                    }}
                                >
                                    Get in Touch
                                </Button>
                            </Box>

                            {/* Footer Section */}
                            <Grid2 container justifyContent="space-evenly">
                                {/* Company Info */}
                                <Grid2 item xs={12} sm={6} md={3} textAlign={{ xs: "center", md: "left" }}>
                                    <Typography variant="h5" fontWeight="bold">
                                        MADZILLA
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                        Loka Digital Tower, Grand Building <br />
                                        Jln Cempaka Wangi No 22 <br />
                                        Jakarta - Indonesia
                                    </Typography>
                                </Grid2>
                                <Grid2 item xs={6} sm={3} md={2} textAlign={{ xs: "center", md: "left" }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Resources
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                        Blog & Insights <br />
                                        Documentation <br />
                                        Case Studies <br />
                                        API Reference
                                    </Typography>
                                </Grid2>

                                {/* Support Section */}
                                <Grid2 item xs={6} sm={3} md={2} textAlign={{ xs: "center", md: "left" }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Support
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                        Help Center <br />
                                        FAQs <br />
                                        Contact Support <br />
                                        System Status
                                    </Typography>
                                </Grid2>

                                {/* Newsletter */}
                                <Grid2 item xs={12} sm={6} md={3} textAlign={{ xs: "center", md: "left" }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Stay Updated
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                        Subscribe to get the latest updates, tips, and insights.
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: { xs: "column", sm: "row" },
                                            gap: 1,
                                            mt: 1,
                                            alignItems: "center",
                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter your email"
                                            size="small"
                                            sx={{
                                                backgroundColor: "white",
                                                borderRadius: "5px",
                                                flex: 1,
                                                minWidth: "60%",
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#4262ff",
                                                px: { xs: 2, md: 3 },
                                                mt: { xs: 1, sm: 0 },
                                            }}
                                        >
                                            Subscribe
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>

                            {/* Social Media Icons */}
                            <Box textAlign="center" mt={4}>
                                <IconButton sx={{ color: "white" }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton sx={{ color: "white" }}>
                                    <YouTube />
                                </IconButton>
                            </Box>
                        </>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default App;
