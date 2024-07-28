import React, { useContext, useState, useEffect } from 'react';
import { BookContext } from './BookContext';

const EditForm = () => {
    const { currentBook, updateBook, setCurrentBook } = useContext(BookContext);
    const [book, setBook] = useState(currentBook || {
        title: '',
        description: '',
        release_year: '',
        total_page: '',
        price: '',
    });

    useEffect(() => {
        if (currentBook) {
            setBook(currentBook);
        }
    }, [currentBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (book && book.id) {
            updateBook(book.id, book);
        }
    };

    if (!currentBook) return <p>Select a book to edit</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" />
            <input type="text" name="description" value={book.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="release_year" value={book.release_year} onChange={handleChange} placeholder="Release Year" />
            <input type="number" name="total_page" value={book.total_page} onChange={handleChange} placeholder="Total Page" />
            <input type="text" name="price" value={book.price} onChange={handleChange} placeholder="Price" />
            <button type="submit">Update Book</button>
            <button type="button" onClick={() => setCurrentBook(null)}>Cancel</button>
        </form>
    );
};

export default EditForm;

