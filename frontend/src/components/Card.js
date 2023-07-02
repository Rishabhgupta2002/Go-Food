import React,{useState,useRef,useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
function Card(props) {
  let data = useCart();

  const dispatch = useDispatchCart();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem=props.foodItems
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let finalPrice = qty * parseInt(options[size]);
  const handleAddToCart=async()=>{
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id && item.size===size) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty,size: size })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: foodItem.img })
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price:finalPrice, qty: qty, size: size,img: foodItem.img })
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div className=''>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-white text-black rounded" style={{ select: "#FF0000" }} onChange={(e)=>{setQty(e.target.value)}}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-white text-black rounded" ref={priceRef} style={{ select: "#FF0000" }} onChange={(e)=>{setSize(e.target.value)}}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
            ₹{finalPrice}/-
            </div>
          </div>
          <hr className='mt-4' />
          <button className='btn justify-centre ms-2 bg-white text-black' onClick={handleAddToCart}>Add To Cart</button>

        </div>
      </div>
    </div>
  )
}

export default Card
