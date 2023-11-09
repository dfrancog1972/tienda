import { useState, useEffect } from 'react'
import { getAllItemsServices } from '../services/itemServices'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import './home.css'

export const Home = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]); 
    }

    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  }
  // Estado para guardar la info de items de la API
  const [itemsData, setItemsData] = useState([])
  const {setSelectedProd, search} = useAuthContext()
  const navigate = useNavigate()
  
  const filteredProdList = itemsData.filter((product) => {
    return product.product_name.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getAllItemsServices()
        if (response.status === 200) {
          setItemsData(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Home', error.message)
      }
    }
    getUserData()
  }, [])
  const placeholderImage = 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098_1280.jpg'

  const handleImageError = (e) => {
    e.target.src = placeholderImage
  }
  const onSetProduct = (producto) => {
    setSelectedProd(producto)
    navigate('/dashboard')
  }
  return (
    <>
      <h1>Home</h1>
      <div className='row-container'>
        {itemsData && filteredProdList.map((product) => (
          <div className='row-prod'>
            <img src={product.image || placeholderImage} alt={product.product_name} key={product.id} onClick = { ()=> onSetProduct(product)}/>
            <div className='row-prod1'>
              <h3> {product.product_name}</h3>
              <p>{product.description}</p>
            </div>
            <div className='row-prod2'>
              <button onClick={() => onAddProduct(product)} className='btn btn-primary btn-outline-default col-xs-3'>Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
export default Home
  