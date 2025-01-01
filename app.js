// Import necessary libraries
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Google Books API endpoint
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

// API route to fetch book details
app.get('/api/books', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=${query}`);
    const data = await response.json();
    if (data.items) {
      const books = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      }));
      res.json(books);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});