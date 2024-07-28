import React, { useContext } from 'react';
import { BookContext } from './BookContext';

const Table = () => {
    const { books, loading, deleteBook, setCurrentBook } = useContext(BookContext);

    if (loading) {
        return <p>Loading books...</p>;
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Release Year</th>
                <th>Total Page</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.description}</td>
                    <td>{book.release_year}</td>
                    <td>{book.total_page}</td>
                    <td>{book.price}</td>
                    <td>
                        <button onClick={() => setCurrentBook(book)}>Edit</button>
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
