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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import SpaIcon from "@mui/icons-material/Spa";
import VerifiedIcon from "@mui/icons-material/Verified";
import SwapHorizIcon from "@mui/icons-material/SwapHorizSharp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

const Navbar = () => {
    const { scene } = useGLTF("/assets/model.glb");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navItems = ["About", "Products", "Contact"];
    const [modelScaleFlag, setModelScaleFlag] = useState(window.innerWidth < 600);
    const targetRotation = 2; // Target final rotation angle
    const [rotationY, setRotationY] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
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
                                <source src="/assets/product-video.mp4" type="video/mp4" />
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
                        <Grid2 xs={12} sm={3} textAlign="center">
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
                        </Grid2>
                    </Grid2>
                </Box>
                <Box
                    id="products"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#c0c0c0",
                    }}
                >
                    <Typography variant="h3">Products</Typography>
                </Box>
                <Box
                    id="contact"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#b0b0b0",
                    }}
                >
                    <Typography variant="h3">Contact Us</Typography>
                </Box>
            </Container>
        </>
    );
};

export default Navbar;
