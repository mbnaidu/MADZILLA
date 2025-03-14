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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const Navbar = () => {
    // Load the GLTF scene
    const { scene } = useGLTF("/assets/model.glb");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navItems = ["Products", "Videos", "Contact"];

    // Boolean flag: true if window width is less than 600px (mobile), false otherwise.
    const [modelScaleFlag, setModelScaleFlag] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setModelScaleFlag(window.innerWidth < 600);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            {/* Navbar Header */}
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

            {/* Mobile Drawer */}
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

            {/* Main Container */}
            <Container
                sx={{
                    minHeight: "100vh",
                    padding: "0px !important",
                    margin: "0px",
                    maxWidth: "100% !important",
                }}
            >
                {isMobile ? (
                    // Mobile View: Model on top, text below.
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
                                    // Position: [-70, -70, 0]
                                    //  - X: -70 shifts the model 70 units to the left.
                                    //  - Y: -70 shifts the model 70 units downward.
                                    //  - Z: 0 means no forward/backward movement.
                                    position={[modelScaleFlag ? -160 : -110, -100, 0]}
                                    // Rotation: [0, 2, 0]
                                    //  - 0: no tilt forward/backward.
                                    //  - 2: rotates the model 2 radians (~114.6°) about the Y-axis.
                                    //  - 0: no roll.
                                    rotation={[0, 2, 0]}
                                    // Scale remains 1.6 regardless.
                                    scale={1.6}
                                />
                                <OrbitControls
                                    enablePan={false}
                                    enableZoom={false}
                                    maxPolarAngle={Math.PI / 2}
                                    minPolarAngle={1.5}
                                />
                            </Canvas>
                        </Box>
                        {/* Only show text if modelScaleFlag is false */}
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
                    // Desktop View: Model with text overlay.
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
                                // Position: [-70, -70, 0]
                                //  - X: -70 shifts the model 70 units to the left.
                                //  - Y: -70 shifts the model 70 units downward.
                                //  - Z: 0 means no forward/backward movement.
                                position={[modelScaleFlag ? -160 : -110, -100, 0]}
                                // Rotation: [0, 2, 0]
                                //  - 0: no tilt.
                                //  - 2: rotates the model 2 radians (~114.6°) about the Y-axis.
                                //  - 0: no roll.
                                rotation={[0, 2, 0]}
                                // Scale remains 1.6.
                                scale={1.6}
                            />
                            <OrbitControls
                                enablePan={false}
                                enableZoom={false}
                                maxPolarAngle={Math.PI / 2}
                                minPolarAngle={1.5}
                            />
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

                {/* PRODUCTS Section */}
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

                {/* VIDEOS Section */}
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

                {/* CONTACT Section */}
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
