import React, { useState, useEffect } from 'react';
import './App.css';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function ArtistGallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [artistList, setArtistList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/manalo/personalities')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArtistList(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Could not fetch artists:", error);
        setError(error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const hasNext = index < artistList.length - 1;
  const artist = artistList[index];

  function handleNextClick() {
    if (hasNext) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      setIndex(0);
    }
  }

  function handleBackClick() {
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
    } else {
      setIndex(artistList.length - 1);
    }
  }

  function handleMoreClick() {
    setShowMore(prevShowMore => !prevShowMore);
  }

  if (loading) {
    return <Typography variant="h6" textAlign="center" mt={4}>Loading artists...</Typography>;
  }

  if (error) {
    return <Typography color="error" textAlign="center" mt={4}>Error loading artists: {error.message}</Typography>;
  }

  if (!artist) {
    return <Typography variant="body1" textAlign="center" mt={4}>No artists available.</Typography>;
  }

  return (
    <Box sx={{ width: '400px', margin: 'auto', padding: '20px', textAlign: 'center', borderRadius: '10px', boxShadow: 3, bgcolor: 'white' }}>
      <Typography variant="h4" fontWeight="bold">MY TOP ARTISTS</Typography>
      <Typography variant="h6">ERNZ DANIELLE MANALO - C-PEITEL3</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button variant="contained" color="error" onClick={handleBackClick}>
          Back
        </Button>

        <Button variant="contained" color="info" onClick={handleNextClick}>
          Next
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <img className="artist-image" src={artist.url} alt={artist.alt} style={{ width: '100%', borderRadius: '10px' }} />
      </Box>

      <Typography variant="h5" sx={{ mt: 2 }}>{artist.name}</Typography>
      <Typography variant="subtitle1">{index + 1} of {artistList.length}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 1 }}>
        <IconButton
          onClick={handleMoreClick}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ExpandMore />
        </IconButton>
        {showMore && (
          <Typography variant="body1" sx={{ mt: 1, px: 2 }}>
            {artist.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}