import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../modal'
import Cart from '../screens/Cart'
import { useCart} from '../components/ContextReducer'
function Navbar() {
  const [cartView, setcartView] = useState(false)
  const Navigate=useNavigate();
  let data = useCart();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    Navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-success bg-dark" style={{ height: "70px" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fw-bold fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active " aria-current="page" to="/myorder">
                      My Order
                      
                    </Link>
                  </li>
                  : ""
              }
            </ul>
            {
                (!localStorage.getItem("authToken")) ?
                <div className="nav-item d-flex">
                <Link className="btn bg-white nav-link active mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white nav-link active mx-1 " to="/createuser">
                  Signup
                </Link>
              </div>
                  : 
                  <div className='nav-item d-flex'>
                  <div className="btn bg-white nav-link active mx-1 " onClick={()=>{setcartView(true)}}>My Cart{" "}
                  
                  <Badge pill bg-danger>{data.length}</Badge>
                  </div>
                  {cartView?<Modal onClose={()=>{setcartView(false)}}><Cart></Cart></Modal>:null}
                  <div className="btn bg-white nav-link text-danger active mx-1 " onClick={handleLogout}>Logout</div>
                  </div>
              }
            
          </div>
        </div>
      </nav>


    </div>
  )
}

export default Navbar
