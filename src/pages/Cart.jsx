import { faBackward, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyCart, removeItemFromCart } from '../redux/slices/cartSlice'


function Cart() {

  const cartArray = useSelector((state)=>state.cartlist)
  console.log(cartArray);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [total,setTotal] = useState()

  const getTotal = ()=>{
    if(cartArray.length>0){
      setTotal(cartArray?.map((item)=>item.price)?.reduce((n1,n2)=>n1+n2))
    }
  }

  const handleCheckOut = () =>{
    alert('Order placed Successfully')
    dispatch(emptyCart())
    navigate('/')
  }

  useEffect(()=>{
    getTotal()
  },[cartArray])
  
  return (
    <>
      <div className='pt-32'>
        <h1 className='text-violet-600 text-center text-4xl mb-5'>Cart</h1>
 
        {cartArray?.length>0?
          <div className='md:grid grid-cols-[2fr_1fr] m-10 text-center'>
         
          <div className='p-3'>
            <table className='w-full border border-gray-700'>
              <thead>
                <tr>
                  <th className='border border-gray-100 p-3  bg-violet-600 text-white'>#</th>
                  <th className='border border-gray-100 p-3  bg-violet-600 text-white'>Title</th>
                  <th className='border border-gray-100 p-3  bg-violet-600 text-white'>Image</th>
                  <th className='border border-gray-100 p-3  bg-violet-600 text-white'>price</th>
                  <th className='border border-gray-100 p-3  bg-violet-600 text-white'>Action</th>
                </tr>
              </thead>


              <tbody>
              {cartArray?.map((item,index)=>(
                <tr>
                  <td className='p-3 border border-gray-200 '>{index+1}</td>
                  <td className='p-3 border border-gray-200 '>{item.title}</td>
                  <td className='p-3 border border-gray-200 flex justify-center'><img src={item.image} alt="no image" style={{width:"150px",height:"100px"}} /></td>
                  <td className='p-3 border border-gray-200 '>$ {item.price}</td>
                  <td className='p-3 border border-gray-200 text-center'><button onClick={()=>dispatch(removeItemFromCart((item?.id)))} className='bg-red-700 text-white py-3 px-5 rounded hover:bg-white hover:text-red-600 hover:border hover:border-red-600'><FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>
              
              ))}
              </tbody>
            </table>
          </div>
        
          <div className='pt-5 px-10'>
            <div className='shadow-lg p-5'>
              <h1 className='text-center text-3xl'>Cart Summary</h1>
              <p className='mt-4 text-xl'>Total number of product : {cartArray.length}</p>
              <p className='mt-4 text-xl'>Grand Total : $ {total}</p>
              <button onClick={()=>handleCheckOut()} className='w-full bg-green-600 text-white p-2 mt-5 hover:border hover:border-green-600 hover:bg-white hover:text-green-600'>Check Out</button>
            </div>
          </div>
        </div>
          :
          <div className='w-full pt-10 md:grid grid-cols-3 mb-10'>
            <div></div>
            <div className='text-center'>
              <img src="https://aleointernational.com/img/empty-cart-yellow.png" alt="" className='w-full h-auto' />
              <Link to={'/'}><button className='bg-green-600 text-white p-3 mt-5 hover:border hover:bg-white hover:border-green-600 hover:text-green-600'> < FontAwesomeIcon icon={faBackward} /> Go To Home</button></Link>
            </div>
            <div></div>
          </div>}

        
      </div>
     
    </>
  )
}

export default Cart