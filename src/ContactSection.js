import React from "react";
import { Box, Button, TextField, Typography, Container, Grid2, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

const ContactSection = () => {
    return (
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
    );
};

export default ContactSection;
