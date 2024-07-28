import React from 'react';
import './App.css';
// import logo from './logo.png';
// import TugasIntroReact from './Tugas-Intro-ReactJS/TugasIntroReact';
// import TugasHooks from './Tugas-Hooks/TugasHooks';
// import TugasCRUDHooks from './TugasCRUDHooks/TugasCRUDHooks';

// import TugasAxios from './Tugas-Axios/TugasAxios';
import TugasAxios from './TugasContext/TugasAxios';
import { BookProvider } from './TugasContext/BookContext';
import Form from './TugasContext/Form';
import Table from './TugasContext/Table';

function App() {
    return (
        <BookProvider>
            <div className="App">
                {/* <TugasHooks />
                <div className="container">
                    <img src={logo} alt="Sanbercode Logo" className="logo" />
                    <h1>THINGS TO DO</h1>
                    <p>During bootcamp in sanbercode</p>
                    <TugasIntroReact />
                </div> */}
                {/* <TugasCRUDHooks /> */}
                {/* <TugasAxios /> */}
                <Form />
                <Table />
            </div>
        </BookProvider>
    );
}

export default App;

