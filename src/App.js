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
    Fab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import About from "./components/About";
import Products from "./components/Products";
import Contact from "./components/Contact";

const App = () => {
    const modelPath = process.env.PUBLIC_URL + "/assets/model.glb";
    const { scene } = useGLTF(modelPath);
    const model2DPath = process.env.PUBLIC_URL + "/assets/Main.png"; // 2D image asset for toggling
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navItems = ["About", "Products", "Contact"];
    const [modelScaleFlag, setModelScaleFlag] = useState(window.innerWidth < 600);
    const targetRotation = 2; // Target final rotation angle
    const [rotationY, setRotationY] = useState(0);
    const [isRotating, setIsRotating] = useState(true);
    const [viewMode, setViewMode] = useState("2d"); // "3d" or "2d"

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

    const scrollToNextSection = () => {
        const sections = ["about", "products", "contact"];
        const currentScroll = window.scrollY;
        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop > currentScroll + 50) {
                section.scrollIntoView({ behavior: "smooth" });
                setViewMode("2d");
                return;
            }
        }
        // If reached the end, scroll to the top fully
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Bounce animation sx object
    const bounceAnimation = {
        animation: "bounce 2s infinite",
        "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
            "40%": { transform: "translateY(-10px)" },
            "60%": { transform: "translateY(-5px)" },
        },
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
                        <Box sx={{ width: "100%", height: "90vh", position: "relative" }}>
                            {viewMode === "3d" ? (
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
                                    <OrbitControls
                                        enablePan={false}
                                        enableZoom={false}
                                        maxPolarAngle={Math.PI / 2}
                                        minPolarAngle={1.5}
                                    />
                                </Canvas>
                            ) : (
                                <Box
                                    component="img"
                                    src={model2DPath}
                                    alt="2D Model"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "none",
                                        display: "block",
                                        margin: "auto",
                                    }}
                                />
                            )}
                            {/* Toggle FAB with bounce animation at top-right corner */}
                            <Fab
                                onClick={() => setViewMode(viewMode === "3d" ? "2d" : "3d")}
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    backgroundColor: "black",
                                    color: "#fff",
                                    ...bounceAnimation,
                                }}
                                size="small"
                            >
                                {viewMode === "3d" ? "2D" : "3D"}
                            </Fab>
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
                        {viewMode === "3d" ? (
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
                                <OrbitControls
                                    enablePan={false}
                                    enableZoom={false}
                                    maxPolarAngle={Math.PI / 2}
                                    minPolarAngle={1.5}
                                />
                            </Canvas>
                        ) : (
                            <Box
                                component="img"
                                src={model2DPath}
                                alt="2D Model"
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "none",
                                    zIndex: 1,
                                    display: "block",
                                    margin: "auto",
                                }}
                            />
                        )}
                        <Typography
                            variant="h1"
                            sx={{
                                position: "absolute",
                                zIndex: 0,
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
                        {/* Toggle FAB with bounce animation at top-right corner */}
                        <Fab
                            onClick={() => setViewMode(viewMode === "3d" ? "2d" : "3d")}
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                backgroundColor: "black",
                                color: "#fff",
                                ...bounceAnimation,
                            }}
                            size="small"
                        >
                            {viewMode === "3d" ? "2D" : "3D"}
                        </Fab>
                    </Box>
                )}
                <About />
                <Products />
                <Contact />
            </Container>
            {/* Scroll-to-next-section FAB visible on all screens */}
            <Fab
                onClick={scrollToNextSection}
                sx={{
                    display: "flex",
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    backgroundColor: "black",
                    color: "#fff",
                    zIndex: 1000,
                }}
            >
                <KeyboardArrowDownIcon />
            </Fab>
        </>
    );
};

export default App;
