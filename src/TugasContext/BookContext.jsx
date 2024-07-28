import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentBook, setCurrentBook] = useState(null);

    const fetchBooks = () => {
        setLoading(true);
        axios.get('https://tugas-sb-sanbercode-go-nextjs-84zn.vercel.app/books')
            .then(response => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const addBook = (newBook) => {
        axios.post('https://tugas-sb-sanbercode-go-nextjs-84zn.vercel.app/books', newBook)
            .then(response => {
                setBooks([...books, response.data.data]);
            })
            .catch(error => {
                console.error('Error adding book:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                }
            });
    };

    const updateBook = (id, updatedBook) => {
        axios.put(`https://tugas-sb-sanbercode-go-nextjs-84zn.vercel.app/books/${id}`, updatedBook)
            .then(response => {
                setBooks(books.map(book => (book.id === id ? response.data.data : book)));
                setCurrentBook(null);
            })
            .catch(error => {
                console.error('Error updating book:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                }
            });
    };

    const deleteBook = (id) => {
        axios.delete(`https://tugas-sb-sanbercode-go-nextjs-84zn.vercel.app/books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                }
            });
    };

    return (
        <BookContext.Provider value={{ books, loading, fetchBooks, addBook, updateBook, deleteBook, currentBook, setCurrentBook }}>
            {children}
        </BookContext.Provider>
    );
};
