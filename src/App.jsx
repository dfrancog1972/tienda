import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { useState } from 'react';
import Header from '@/components/Header'
import RoutesIndex from '@/routes/RoutesIndex'
import './App.css'

// se crean los estados para controlar la cantidad de productos comprados y los totales
function App () {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
          <RoutesIndex />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App