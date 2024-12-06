import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItems } from '../redux/slices/wishlistSlice'
import { addItemToCart } from '../redux/slices/cartSlice'


function Wishlist() {

  const wishlistArray = useSelector((state)=>state.wishlist)
  console.log(wishlistArray);
  
  const dispatch = useDispatch()

  const wishes =(item)=>{
    dispatch(addItemToCart(item))
    dispatch(removeWishlistItems(item.id))
  }

  return (
    <>
      <div className='pt-32'>
        <h1 className='text-violet-600 text-center text-4xl mb-5'>Wishlist</h1>

        {wishlistArray?.length>0 ?
          <div className="px-10 mb-10 md:grid grid-cols-4">
       
            {wishlistArray?.map((item) => (
              <div className="p-2">
                <div className="p-3 rounded shadow-lg">
                  <img src={item.image} alt="No image" className='w-full h-60' />
                  <h4 className='text-center text-3xl'>{item.title.slice(0,10)}</h4>
                  <p className='text-justify pt-5'>{item.description.slice(0,100)}</p>
                  <p className='text-2xl p-3'>Price <span className='text-violet-600'>$ {item.price}</span></p>
                  <div className='flex justify-between'>
                    <button onClick={()=>dispatch(removeWishlistItems(item?.id))} className='bg-red-700 text-white py-3 px-5 rounded hover:bg-white hover:text-red-600 hover:border hover:border-red-600'><FontAwesomeIcon icon={faTrash} /></button>
                    <button onClick={()=>wishes(item)} className='px-5 py-3 rounded text-white bg-green-600 hover:bg-white hover:text-green-600 hover:border hover:border-green-600'><FontAwesomeIcon icon={faCartShopping} /></button>
                  </div>
                </div>
              </div>
            ))
            }

          </div>
            :
          <div className='w-full pt-10 md:grid grid-cols-3'>
        <div></div>
        <div>
          <img src="https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png" alt="No image" className='w-full h-auto' />
        </div>
        <div></div>
          </div>
          }

      </div>
    </>
  )
}

export default Wishlist