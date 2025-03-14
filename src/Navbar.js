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
    Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

// Navbar Component & 3D Section
const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navItems = ["About", "Products", "Videos", "Contact"];

    // Toggle mobile drawer open/close
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Smooth scrolling to sections
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileOpen(false); // Close mobile menu after click
    };

    return (
        <>
            {/* Navbar Header */}
            <AppBar position="sticky" sx={{ background: "#fff" }}>
                <Toolbar>
                    {/* Logo/Brand - Click to scroll to home */}
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

                    {/* Desktop Navigation Menu */}
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

                    {/* Mobile Hamburger Button */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        sx={{ display: { md: "none" } }}
                        onClick={handleDrawerToggle}
                    >
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

            {/* Main Sections Container */}
            <Container
                sx={{
                    minHeight: "100vh",
                    padding: "0px !important",
                    margin: "0px",
                    maxWidth: "100% !important",
                }}
            >
                {/* Home Section with 3D Model & Text */}
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
                    {/* 3D Canvas */}
                    <Canvas
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 1, // Places the model behind the text overlay
                        }}
                        camera={{ position: [10, 360, -400], fov: 50 }}
                    >
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} />
                        <Environment preset="sunset" />
                        <Model />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={1.5}
                        />
                    </Canvas>

                    {/* Text Overlay */}
                    <Typography
                        variant="h1"
                        sx={{
                            position: "absolute",
                            fontSize: { xs: "12vw", sm: "15vw" },
                            textTransform: "uppercase",
                            letterSpacing: { xs: "1vw", sm: "1.5vw", md: "2vw", lg: "2.5vw" },
                            color: "#000", // Fully black text
                            textShadow: `
                10px 10px 20px rgba(0, 0, 0, 0.6), 
                20px 20px 40px rgba(0, 0, 0, 0.4),
                30px 30px 60px rgba(0, 0, 0, 0.2)
              `,
                            // Positioned absolutely to overlay on top of the canvas
                        }}
                    >
                        MADZILLA
                    </Typography>
                </Box>

                {/* Other Sections */}
                <Box
                    id="about"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#e0e0e0",
                    }}
                >
                    <Typography variant="h3">About Us</Typography>
                </Box>
                <Box
                    id="products"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#d0d0d0",
                    }}
                >
                    <Typography variant="h3">Our Products</Typography>
                </Box>
                <Box
                    id="videos"
                    sx={{
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#c0c0c0",
                    }}
                >
                    <Typography variant="h3">Videos</Typography>
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

// 3D Model Component
function Model() {
    const { scene } = useGLTF("/assets/model.glb");
    return (
        <primitive
            object={scene}
            // Position: [-70, -70, 0]
            //  - -70 on X-axis: moves the model left/right (negative moves it left).
            //  - -70 on Y-axis: moves the model down.
            //  - 0 on Z-axis: no forward/backward displacement.
            position={[-70, -90, 0]}

            // Rotation: [0, 2, 0]
            //  - 0 radians around X-axis: no tilt forward/backward.
            //  - 2 radians around Y-axis: rotates the model horizontally for proper viewing.
            //  - 0 radians around Z-axis: no roll.
            rotation={[0, 2, 0]}

            // Scale: 1.5
            //  - Uniformly enlarges the model by 1.5 times.
            scale={1.5}
        />
    );
}

export default Navbar;
