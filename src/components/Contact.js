import { Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

function Contact() {
    return (
        <Box
            id="contact"
            sx={{
                background: "linear-gradient(135deg, #1a1c23, #0b0e17)",
                py: { xs: 4, md: 8 },
                px: { xs: 2, md: 4 },
            }}
        >
            <Box
                sx={{
                    maxWidth: { xs: "1200px", lg: "100%" },
                    mx: "auto",
                    color: "white",
                    px: { xs: 2, lg: 4 },
                }}
            >
                {/* Top Section */}
                <Box textAlign="center" mb={4}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
                    >
                        Have a Question?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ opacity: 0.8, fontSize: { xs: "0.9rem", md: "1.1rem" } }}
                    >
                        Reach out to our team and let’s discuss how we can help you.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "#4262ff",
                            borderRadius: "20px",
                            px: 4,
                            py: 1,
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            transition: "background-color 0.3s ease",
                            "&:hover": { backgroundColor: "#3151cc" },
                        }}
                    >
                        Get in Touch
                    </Button>
                </Box>

                {/* Grid Section */}
                <Grid2 container spacing={4} sx={{ justifyContent: { xs: "center", lg: "space-between" } }}>
                    <Grid2
                        item
                        xs={12} sm={6} md={3}
                        textAlign={{ xs: "center", md: "left" }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
                        >
                            MADZILLA
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.7, fontSize: { xs: "0.8rem", md: "1rem" } }}
                        >
                            Loka Digital Tower, Grand Building <br />
                            Jln Cempaka Wangi No 22 <br />
                            Jakarta - Indonesia
                        </Typography>
                    </Grid2>

                    <Grid2
                        item
                        xs={12} sm={6} md={2}
                        textAlign={{ xs: "center", md: "left" }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                        >
                            Resources
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.7, fontSize: { xs: "0.8rem", md: "1rem" } }}
                        >
                            Blog & Insights <br />
                            Documentation <br />
                            Case Studies <br />
                            API Reference
                        </Typography>
                    </Grid2>

                    <Grid2
                        item
                        xs={12} sm={6} md={2}
                        textAlign={{ xs: "center", md: "left" }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                        >
                            Support
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.7, fontSize: { xs: "0.8rem", md: "1rem" } }}
                        >
                            Help Center <br />
                            FAQs <br />
                            Contact Support <br />
                            System Status
                        </Typography>
                    </Grid2>

                    <Grid2
                        item
                        xs={12} sm={6} md={3}
                        textAlign={{ xs: "center", md: "left" }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                        >
                            Stay Updated
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, opacity: 0.7, fontSize: { xs: "0.8rem", md: "1rem" } }}
                        >
                            Subscribe to get the latest updates, tips, and insights.
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 1,
                                mt: 1,
                                alignItems: "center",
                                justifyContent: "center",
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
                                    minWidth: { xs: "100%", sm: "60%" },
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#4262ff",
                                    px: { xs: 2, md: 3 },
                                    mt: { xs: 1, sm: 0 },
                                    transition: "background-color 0.3s ease",
                                    "&:hover": { backgroundColor: "#3151cc" },
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>

                {/* Social Icons */}
                <Box textAlign="center" mt={4}>
                    <IconButton
                        sx={{
                            color: "white",
                            transition: "color 0.3s",
                            "&:hover": { color: "#4262ff" }
                        }}
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "white",
                            transition: "color 0.3s",
                            "&:hover": { color: "#4262ff" }
                        }}
                    >
                        <Instagram />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "white",
                            transition: "color 0.3s",
                            "&:hover": { color: "#4262ff" }
                        }}
                    >
                        <Twitter />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "white",
                            transition: "color 0.3s",
                            "&:hover": { color: "#4262ff" }
                        }}
                    >
                        <YouTube />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Contact;
