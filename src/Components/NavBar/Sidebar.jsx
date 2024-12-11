import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../../assets/img/avatar-6.jpg'
function Sidebar() {
   const navigate = useNavigate()
   const {user} = useSelector((state) => state.auth)
    const logout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload();
    }
    return (
        <>
            <nav id="sidebar">
                {/* <!-- Sidebar Header--> */}
                <div className="sidebar-header d-flex align-items-center">
                    {/* <div className="avatar"><img src={avatar} alt="Avatar" className="img-fluid rounded-circle" /></div> */}
                    <div className="title">
                        <h1 className="h5">{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                {/* <!-- Sidebar Navidation Menus--> */}
                <span className="heading">Main</span>
                <ul className="list-unstyled">
                    <li>
                        <Link to='/user/deshboard'>
                            <i class="fa-regular fa-user"></i>User's
                        </Link>
                    </li>
                    {/* <li className="active"><a href="tables.html"> <i className="icon-grid"></i>User's </a></li> */}
                    <li>
                        <Link to='/product/deshboard'>
                            <i className="fa fa-bar-chart"></i>Products
                        </Link>
                    </li>
                    <li>
                        <Link to='/category/deshboard'>
                            <i className="icon-padnote"></i>Category
                        </Link> </li>
                    <li>
                        <Link onClick={logout}>
                            <i className="icon-logout"></i>Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar