import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Form from './components/Form'
import FormView from './components/FormView';
import EditForm from './components/EditForm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/form' element={<Form/>} />
          <Route path="/form/:id" element={<FormView />} />
          <Route path="/form/edit/:formId" element={<EditForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App