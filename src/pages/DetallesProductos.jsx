import { useProdContext } from '@/hooks/useProdContext'
import DetallesProductos from '@/components/DetallesProductos/DetallesProductos.jsx'
import './productos.css'

const ProdList = () => {
const { list, loading, setSelectedProd, selectedProd, search } = useProdContext()

  // Lista de canciones filtradas por la palabra buscada
const filteredProdList = list.filter((prod) => {
    return prod.product_name.toLowerCase().includes(search.toLowerCase())
})

return (
    <section className='row-container'>
    {loading
        ? <h1>Cargando...</h1>
        : Object.entries(selectedProd).length !== 0 ? <DetallesProductos/> : filteredProdList.map((prod) => (
        <div
            className='row-prod'
            key={prod.id}
            onClick={() => setSelectedProd(prod)}
        >
            <img src={prod.image} alt={prod.product_name} />
            <h3>{prod.product_name}</h3>
            <h4>{prod.category}</h4>
            <h4>{prod.price}</h4>
        </div>
        ))}
    </section>
)
}
export default ProdList