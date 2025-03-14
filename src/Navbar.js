import React, { useState } from "react";
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
    Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navItems = ["About", "Products", "Videos", "Contact"];
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileOpen(false); // Close mobile menu after click
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="sticky" sx={{ background: "#fff" }}>
                <Toolbar>
                    {/* Left Side - Logo */}
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: "pointer", color: "#000", letterSpacing: "0.5rem" }}
                        onClick={() => scrollToSection("home")}
                    >
                        MADZILLA
                    </Typography>
                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: "#000" }} onClick={() => scrollToSection(item.toLowerCase())}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    {/* Mobile Menu Button */}
                    <IconButton color="inherit" edge="end" sx={{ display: { md: "none" } }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* Mobile Drawer */}
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                <List>
                    {navItems.map((item) => (
                        <ListItem button key={item} onClick={() => scrollToSection(item.toLowerCase())}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {/* Sections */}
            <Container sx={{ minHeight: "100vh", padding: "0px !important", margin: "0px", maxWidth: "100% !important" }}>
                {/* Home Section - 3D Model Centered in MADZILLA */}
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
                    {/* 3D Model in Center */}
                    <Canvas
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        camera={{ position: [10, 360, -400], fov: 50 }}
                    >
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={2} />
                        <Environment preset="sunset" />
                        <Model />
                        <OrbitControls
                            enablePan={false}  // Prevents moving the model
                            enableZoom={false} // Prevents zooming in/out
                            minPolarAngle={Math.PI / 2} // Restricts rotation to Z-axis
                        />
                    </Canvas>
                    {/* Text Overlay */}
                    <Typography
                        variant="h1"
                        sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "17.5vw", sm: "18vw", md: "18vw", lg: "18vw" },
                            textTransform: "uppercase",
                            letterSpacing: { xs: "2vw", sm: "1.5vw", md: "1vw", lg: "0.5vw" },
                            width: "100%",
                            textAlign: "center",
                            color: "#000",
                            textShadow: `
                                10px 10px 20px rgba(0, 0, 0, 0.6), 
                                20px 20px 40px rgba(0, 0, 0, 0.4),
                                30px 30px 60px rgba(0, 0, 0, 0.2)
                            `,
                            position: "absolute",
                            zIndex: 2,
                        }}
                    >
                        MADZILLA
                    </Typography>
                </Box>
                {/* Other Sections */}
                <Box id="about" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e0e0e0" }}>
                    <Typography variant="h3">About Us</Typography>
                </Box>
                <Box id="products" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#d0d0d0" }}>
                    <Typography variant="h3">Our Products</Typography>
                </Box>
                <Box id="videos" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#c0c0c0" }}>
                    <Typography variant="h3">Videos</Typography>
                </Box>
                <Box id="contact" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#b0b0b0" }}>
                    <Typography variant="h3">Contact Us</Typography>
                </Box>
            </Container>
        </>
    );
};

// 3D Model Component
function Model() {
    const { scene } = useGLTF("/assets/model.glb");
    return (
        <primitive
            object={scene}
            position={[-70, -70, 0]} // 🔹 Centered in the middle of text
            rotation={[0, 2, 0]} // 🔹 Rotated for proper viewing
            scale={1.5} // 🔹 Adjust scale if needed
        />
    );
}

export default Navbar;
