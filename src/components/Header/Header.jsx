import { NavLink } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useState } from 'react';
import './header.scss'

export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
  const [active, setActive] = useState(false);

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};
  const { isAuth, logout, setSearch } = useAuthContext()
  const linkIsActive = (isActive) => {
    return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const placeholderImage = 'https://salesland.net/sites/default/files/2017-06/Sales-Blog-Omnicanalidad-Ventas.jpg'

  return (
    <nav className='header'>
      <NavLink className='header__logo' to='/'><img src={placeholderImage}  width='90px' alt='Logo' /></NavLink>
      <input
        className='header__input-search'
        type='search'
        placeholder='Buscar prod...'
        onChange={handleSearch}
      />
      <ul className='header__nav-list'>

        <li className='header__list-item'>
          <NavLink
            to='/'
            className={({ isActive }) => linkIsActive(isActive)}
          >Home
          </NavLink>
        </li>
        {isAuth
          ? (
            <>
              <li className='header__list-item'>
                <NavLink
                  to='/secret'
                  className={({ isActive }) => linkIsActive(isActive)}
                >Secret
                </NavLink>
              </li>

              <li className='header__list-item'>
                <NavLink
                  to='/'
                  className='header__item-link'
                  onClick={logout}
                >Logout
                </NavLink>
              </li>
            </>
            )
          : (
            <>
              <li className='header__list-item'>
                <NavLink
                  to='/login'
                  className={({ isActive }) => linkIsActive(isActive)}
                >Login
                </NavLink>
              </li>

              <li className='header__list-item'>
                <NavLink
                  to='/signup'
                  className={({ isActive }) => linkIsActive(isActive)}
                >Signup
                </NavLink>
              </li>
            </>
            )}

      </ul>
      {/* carrito de compras */}
      <div className='container-icon' onClick={() => setActive(!active)}>
        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='icon-cart'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'/>
          </svg>
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>

        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {
            allProducts.length ?(
              <>
              	<div className='row-product'>
                  {allProducts.map(product => (
                    <div className='cart-product' key={product.id}>
                      <div className='info-cart-product'>
                        <span className='cantidad-producto-carrito'>
                          {product.quantity}
                        </span>
                        <p className='titulo-producto-carrito'>
                          {product.nameProduct}
                        </p>
                        <span className='precio-producto-carrito'>
                          ${product.price}
                        </span>
                      </div>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='icon-close' onClick={() => onDeleteProduct(product)}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/>
                      </svg>
                    </div>
                  ))}
                </div>

                <div className='cart-total'>
                  <h3>Total:</h3>
                  <span className='total-pagar'>${total}</span>
                </div>

                <button className='btn-clear-all' onClick={onCleanCart}>
                  Vaciar Carrito
                </button>
              </>
							) : (
            <p className='cart-empty'>El carrito está vacío</p>  
            )}       					
			  </div>
      </div>
    </nav>
  )
}
export default Header