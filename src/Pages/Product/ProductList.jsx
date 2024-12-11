import React from 'react'
import { Link } from 'react-router-dom'
import ProductListData from '../../Components/Product/ProductListData'

function ProductList() {
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
                            <Link to='/product/deshboard'>
                                Home
                            </Link></li>
                        <li className="breadcrumb-item active">Product's</li>
                    </ul>
                    <div className="d-flex justify-content-end">
                    <Link to='/product/add' className='btn btn-primary mx-3 mb-3'>Create +</Link>
                    </div>
                </div>
                <section className="no-padding-top">
                    <ProductListData />
                </section>
            </div>
    </>
  )
}

export default ProductList