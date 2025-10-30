import React, { useState } from "react";

export default function LibraryManagement() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title.trim() || !newBook.author.trim()) return;

    setBooks([
      ...books,
      { id: Date.now(), title: newBook.title, author: newBook.author },
    ]);
    setNewBook({ title: "", author: "" });
  };

  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", fontFamily: "sans-serif" }}>
      <h1>📚 Library Management</h1>

      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredBooks.length === 0 ? (
          <li>No books found.</li>
        ) : (
          filteredBooks.map((book) => (
            <li
              key={book.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              <span>
                <strong>{book.title}</strong> — {book.author}
              </span>
              <button
                onClick={() => handleRemoveBook(book.id)}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>

      <form onSubmit={handleAddBook} style={{ marginTop: "20px" }}>
        <h3>Add a New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            background: "#2ecc71",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
}