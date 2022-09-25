/*
    A NavBar component that is used to navigate between pages.
    It is a stateless component that takes in a list of links
    and renders them as a list of links.
    - LOGO on the left

    ! The rest is on the right
    - Home
    - Github
    - Sponsor
    - About

*/
import React from 'react'
// Import the MUI components
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
export default function NavBar() {
    return (
        <AppBar position="inherit"
            style={{
                marginBottom: '0.25rem',
                backgroundColor: '#4d79ff',
            }}>
            <Toolbar style={{
                flex: 1,
            }}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Typography variant="h6"  >
                        Dockard
                    </Typography>
                </IconButton>
                <div style={{
                    float: 'right',
                    right: '0',
                    position: 'absolute',
                    marginRight: '1rem',
                }}>
                    <Button color="inherit" href="/">
                        <p>
                            Home
                        </p>
                    </Button>
                    <Button color="inherit" title="GitHub">
                        <p>Github</p>
                    </Button>
                    <Button color="inherit">
                        <p>
                            Docker Image
                        </p></Button>
                    <Button color="inherit">
                        <p>About
                        </p>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}
