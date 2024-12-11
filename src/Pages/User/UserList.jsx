import React from 'react'
import { Link } from 'react-router-dom'
import UserListData from '../../Components/User/UserListData'
import { useSelector } from 'react-redux'

function UserList() {
    return (
        <>
            <div className="page-content">
                {/* <!-- Page Header--> */}
                <div className="page-header no-margin-bottom">
                    <div className="container-fluid">
                        <h2 className="h5 no-margin-bottom">Tables</h2>
                    </div>
                </div>
                {/* <!-- Breadcrumb--> */}
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/user/deshboard'>
                                Home
                            </Link></li>
                        <li className="breadcrumb-item active">User's</li>
                    </ul>
                </div>
                <section className="no-padding-top">
                    <UserListData />
                </section>
            </div>
        </>
    )
}

export default UserList