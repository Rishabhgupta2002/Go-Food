import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
// import Carousel from '../components/Carousel'
import image1 from "../components/images/photo1.jpg"
import image2 from "../components/images/image2.jpg"
import image3 from "../components/images/image3.jpg"


function Home() {
  const [foodCategory, setfoodCategory] = useState([])
  const [fooditems, setfooditems] = useState([])
  const [search, setSearch] = useState('')
  
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    // console.log(response[0],response[1])
    setfooditems(response[0])
    setfoodCategory(response[1])
    // console.log(foodCategory,fooditems)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}/>
                <button className="btn text-white bg-dark" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src={image1} className="d-block w-100  " style={{ filter: "brightness(30%)", height: "660px", width: "900px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={image2} className="d-block w-100 " style={{ filter: "brightness(30%)", height: "660px", width: "900px" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={image3} className="d-block w-100 " style={{ filter: "brightness(30%)", height: "660px", width: "900px" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCategory !== []
            ? foodCategory.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {fooditems !== [] ? fooditems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodItems={filterItems} options={filterItems.options[0]} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer />

    </div>
  )
}

export default Home
