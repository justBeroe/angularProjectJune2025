const express = require('express');
const axios = require('axios');
const Song = require('../models/song');

const router = express.Router();

// GET /api/fetch-deezer?artistId=85
router.get('/api/fetch-deezer', async (req, res) => {
  try {
    const artistId = req.query.artistId || '85';

    const response = await axios.get(`https://api.deezer.com/artist/${artistId}/top?limit=50`);
    const tracks = response.data.data;

    if (!Array.isArray(tracks)) {
      return res.status(500).json({ error: 'Unexpected Deezer data format' });
    }

    const cleanedTracks = tracks.map(track => ({
      id: track.id,
      title: track.title,
      preview: track.preview,
      artist: {
        id: track.artist.id,
        name: track.artist.name,
        picture: track.artist.picture
      },
      album: {
        id: track.album.id,
        title: track.album.title,
        cover: track.album.cover
      }
    }));

    // await Song.deleteMany({});
    // await Song.insertMany(cleanedTracks);

         const bulkOps = cleanedTracks.map(track => ({
          updateOne: {
            filter: { id: track.id },
            update: { $set: track },
            upsert: true
          }
        }));
    
        const result = await Song.bulkWrite(bulkOps);

    res.json({ message: `✅ Data fetched for artist ${artistId} and saved to MongoDB`, count: cleanedTracks.length });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({ error: 'Failed to fetch Deezer data', details: error.message });
  }
});

// GET /api/songs
router.get('/api/songs', async (req, res) => {
//   try {
//     const songs = await Song.find({});
//     res.json(songs);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve songs', details: error.message });
//   }
// });
  const artistId = Number(req.query.artistId);
  try {
    const filter = artistId ? { 'artist.id': artistId } : {};
    const songs = await Song.find(filter);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve songs', details: error.message });
  }
});

// ---------------------- //
// PUT /api/songs/:id  -> Update a song by its MongoDB _id
router.put('/api/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;
    const updateData = req.body; // send updated fields in JSON body

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { $set: updateData },
      { new: true } // return the updated document
    );

    if (!updatedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ message: 'Song updated successfully', song: updatedSong });
  } catch (error) {
    console.error('Error updating song:', error.message);
    res.status(500).json({ error: 'Failed to update song', details: error.message });
  }
});

// DELETE /api/songs/:id  -> Delete a song by its MongoDB _id
router.delete('/api/songs/:id', async (req, res) => {
  try {
    const songId = req.params.id;

    const deletedSong = await Song.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ message: 'Song deleted successfully', song: deletedSong });
  } catch (error) {
    console.error('Error deleting song:', error.message);
    res.status(500).json({ error: 'Failed to delete song', details: error.message });
  }
});

module.exports = router;
