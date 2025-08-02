const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (change connection string if needed)
mongoose.connect('mongodb://localhost:27017/deezerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Mongoose schema and model for a song
const songSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: String,
  preview: String,
  artist: {
    id: Number,
    name: String,
    picture: String
  },
  album: {
    id: Number,
    title: String,
    cover: String
  }
});

const Song = mongoose.model('Song', songSchema);

// Route to fetch from Deezer and save to MongoDB
// Accepts artistId as query parameter: /api/fetch-deezer?artistId=85
app.get('/api/fetch-deezer', async (req, res) => {
  try {
    // Default artistId to 85 if not provided
    const artistId = req.query.artistId || '85';

    // Fetch top tracks from Deezer API
    const response = await axios.get(`https://api.deezer.com/artist/${artistId}/top?limit=50`);
    const tracks = response.data.data;

    if (!Array.isArray(tracks)) {
      return res.status(500).json({ error: 'Unexpected Deezer data format' });
    }

    // Map and clean data
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

    // Remove old songs before inserting new data
    await Song.deleteMany({});

    // Insert cleaned tracks into MongoDB
    await Song.insertMany(cleanedTracks);

    res.json({ message: `✅ Data fetched for artist ${artistId} and saved to MongoDB`, count: cleanedTracks.length });
  } catch (error) {
    console.error('Error fetching from Deezer:', error.message);
    res.status(500).json({ error: 'Failed to fetch Deezer data', details: error.message });
  }
});

// Route to get all songs from MongoDB
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve songs', details: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
