// TugasAxios.js
import React from 'react';
import { DataProvider } from './TugasContext';
import Form from './Form';
import Table from './Table';

const TugasAxios = () => {
    return (
        <DataProvider>
            <h2>Book List</h2>
            <Form />
            <Table />
        </DataProvider>
    );
};

export default TugasAxios;



