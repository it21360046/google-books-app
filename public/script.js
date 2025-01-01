const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const bookList = document.getElementById('bookList');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  bookList.innerHTML = '<p>Loading...</p>';

  const query = searchQuery.value;
  try {
    const response = await fetch(`/api/books?query=${query}`);
    const books = await response.json();

    if (books.length > 0) {
      bookList.innerHTML = books.map((book) => `
        <li>
          <img src="${book.thumbnail || 'placeholder.jpg'}" alt="${book.title}" width="100" />
          <div class="book-info">
            <h3>${book.title}</h3>
            <p><strong>Authors:</strong> ${book.authors?.join(', ') || 'N/A'}</p>
            <p>${book.description || 'No description available.'}</p>
          </div>
        </li>
      `).join('');
    } else {
      bookList.innerHTML = '<p>No books found.</p>';
    }
  } catch (error) {
    bookList.innerHTML = '<p>Failed to fetch books. Please try again later.</p>';
  }
});