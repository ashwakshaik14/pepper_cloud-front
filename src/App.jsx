import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Form from './components/Form'
import FormView from './components/FormView';
import EditForm from './components/EditForm';

function App() {
  useEffect(() => {
    const connectMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    };
    connectMetaMask();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/form' element={<Form />} />
          <Route path="/form/:id" element={<FormView />} />
          <Route path="/form/edit/:formId" element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App