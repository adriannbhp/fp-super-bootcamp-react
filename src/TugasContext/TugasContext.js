// TugasContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        image_url: '',
        release_year: '',
        price: '',
        total_page: '',
    });
    const [errors, setErrors] = useState({});
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('https://tugas-sb-sanbercode-go-nextjs-c4ik.vercel.app/books');
            if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                console.error('Unexpected response data:', response.data);
                setBooks([]);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const { title, description, image_url, release_year, price, total_page } = form;
        let errors = {};

        if (!title) errors.title = 'Title is required';
        if (!description) errors.description = 'Description is required';
        if (!image_url) {
            errors.image_url = 'Image URL is required';
        } else if (!/^https?:\/\/.+\..+/.test(image_url)) {
            errors.image_url = 'Image URL must be a valid URL';
        }
        if (!release_year) {
            errors.release_year = 'Release year is required';
        } else if (release_year < 1980 || release_year > 2021) {
            errors.release_year = 'Release year must be between 1980 and 2021';
        }
        if (!price) errors.price = 'Price is required';
        if (!total_page) {
            errors.total_page = 'Total page is required';
        } else if (isNaN(total_page) || total_page <= 0) {
            errors.total_page = 'Total page must be a positive number';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            console.log("Submitting form data: ", form);

            if (editing) {
                await axios.patch(`https://tugas-sb-sanbercode-go-nextjs-c4ik.vercel.app/books/${editing}`, JSON.stringify(form), config);
            } else {
                await axios.post('https://tugas-sb-sanbercode-go-nextjs-c4ik.vercel.app/books', JSON.stringify(form), config);
            }

            setForm({
                title: '',
                description: '',
                image_url: '',
                release_year: '',
                price: '',
                total_page: '',
            });
            setEditing(null);
            fetchBooks();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (book) => {
        setForm({
            title: book.title,
            description: book.description,
            image_url: book.image_url,
            release_year: book.release_year,
            price: book.price,
            total_page: book.total_page,
        });
        setEditing(book.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tugas-sb-sanbercode-go-nextjs-c4ik.vercel.app/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <DataContext.Provider
            value={{
                books,
                form,
                errors,
                editing,
                handleInputChange,
                handleSubmit,
                handleEdit,
                handleDelete,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
