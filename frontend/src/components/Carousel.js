import React from 'react'
import image1 from "./images/photo1.jpg"
import image2 from "./images/image2.jpg"
import image3 from "./images/image3.jpg"
function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

        <div className="carousel-inner " id='carousel'>
          <div className=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" />
              <button className="btn text-white bg-dark" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active" >
            <img src={image1} className="d-block w-100  " style={{ filter: "brightness(30%)", height: "900px", width: "700px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={image2} className="d-block w-100 " style={{ filter: "brightness(30%)", height: "900px", width: "700px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={image3} className="d-block w-100 " style={{ filter: "brightness(30%)", height: "900px", width: "700px" }} alt="..." />
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
  )
}

export default Carousel
