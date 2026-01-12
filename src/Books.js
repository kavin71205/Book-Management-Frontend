import { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook, updateBook } from "./api";

export default function Books({ token, onLogout }) {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    if (!token) return;
    async function fetchBooks() {
      const data = await getBooks(token);
      setBooks(data);
    }
    fetchBooks();
  }, [token]);
  

  async function handleAdd() {
  if (editingId) {
    await updateBook(token, editingId, title, author);
    setEditingId(null);
  } else {
    await addBook(token, title, author);
  }

  setTitle("");
  setAuthor("");

  const data = await getBooks(token);
  setBooks(data);
}

  async function handleDelete(id) {
    await deleteBook(token, id);
    const data = await getBooks(token);
    setBooks(data);
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );
  function handleEdit(book) {
  setTitle(book.title);
  setAuthor(book.author);
  setEditingId(book.id);
}


  return (
  <div className="flex justify-center mt-16">
    <div className="w-full max-w-2x2 bg-white rounded-xl shadow-md p-8">
    <h2 className="text-xl font-medium mb-4">Books</h2>

    {/* Add book form */}
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm
             hover:bg-blue-700 transition" onClick={handleAdd}>
  {editingId ? "Update" : "Add"}
  </button>
    </div>

    {/* Search */}
    <input
      className="w-full border rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
      placeholder="Search by title or author"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button
  onClick={() => setShowBooks(!showBooks)}
  className="mb-4 bg-gray-700 text-white px-4 py-2 rounded
             text-sm hover:bg-gray-800 transition"
>
  {showBooks ? "Close Books" : "View Books"}
</button>

    {/* Book list */}
    {showBooks && (
  <ul className="space-y-2">
    {filteredBooks.map(book => (
      <li
        key={book.id}
        className="flex justify-between items-center border rounded px-4 py-2"
      >
        <span>
          <span className="font-medium">{book.title}</span>
          <span className="text-gray-500"> — {book.author}</span>
        </span>

        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(book)}
            className="text-blue-600 text-sm hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(book.id)}
            className="text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
)}

    {showBooks && filteredBooks.length === 0 && (
  <p className="text-center text-gray-400 text-sm mt-4">
    No books found
  </p>
)}

    <button onClick={onLogout}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3
                   font-medium hover:bg-blue-700 transition"
      >
        LogOut
      </button>
  </div>
  </div>
)};