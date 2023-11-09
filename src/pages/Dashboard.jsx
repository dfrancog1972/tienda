import { useState, useEffect } from 'react'
import { useAuthContext } from '@/Hooks/useAuthContext'
import { getMeUserService } from '@/services/userServices'

const Dashboard = () => {
  const [userData, setUserData] = useState({})
  const token = localStorage.getItem('token')
  const { selectedProd } = useAuthContext()
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getMeUserService(token)
        if (response.status === 200) {
          setUserData(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Dashboard', error.message)
      }
    }
    getUserData()
  }, [token])
  const placeholderImage = 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098_1280.jpg'
  const creacion = selectedProd.createdAt.slice(0,10)
  const alta = selectedProd.updatedAt.slice(0,10)
  return (
    <>
      <div className='row row-cols-1 row-cols-md-4 g-5'>
        <div className='col'>
          <div className='card'>
            <img src={selectedProd.image || placeholderImage} alt={selectedProd.product_name} />
          </div>
        </div>
        <div className='col'>
          <div className='card-body'>
            <h3>{'Nombre: ' + selectedProd.product_name}</h3>
            <p>{'Descripción: ' + selectedProd.description}</p>
            <h4>{'Precio: $ ' + new Intl.NumberFormat('en-MX', 2).format(selectedProd.price)}</h4>
            <h4>{'Categoria: ' + selectedProd.category}</h4>
            <h4>{'Marca: ' + selectedProd.brand}</h4>
            <h4>{'Fecha de creación: ' + creacion}</h4>
            <h4>{'Fecha de actualización: ' + alta}</h4>
            

          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
