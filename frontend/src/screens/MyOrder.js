import React,{ useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyOrder() {

  const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            setorderData(response)
        })}

    useEffect(() => {
        fetchMyOrder()
    }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className='container'>
        <h2 className='mt-2'>Your Orders</h2>
        <div className='row'>

          {orderData !== {} ? Array(orderData).map(data => {
            return (
              data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item) => {
                  return (
                    item.map((arrayData) => {
                      return (
                        <div  >
                          {arrayData.Order_date ? <div className='m-auto mt-3'>

                            {data = arrayData.Order_date}
                            <hr />
                          </div> :

                            <div className='col-12 col-md-6 col-lg-3' >
                             
                              <div className="card mt-3" style={{ width: "16rem", maxHeight: "600px" }}>
                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                <div className="card-body mb-3 ">
                                  <h5 className="card-title">{arrayData.name}</h5>
                                  <div className='container w-100 p-0' style={{ height: "38px" }}>
                                    <div className=' d-inline'>Quantity : {arrayData.qty}/{arrayData.size}</div>
                                    {/* <div className='m-4 d-inline'>Size:{arrayData.size}</div> */}
                        
                                    <div className='mt-1 h-100 w-20 fs-5' >
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>



                          }

                        </div>
                      )
                    })

                  )
                }) : ""
            )
          }) : ""}
        </div>


      </div>
      <Footer></Footer>
    </div>
  )
}

export default MyOrder
