import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              {/* Navbar Header */}
              <Link to="user/deshboard" className="navbar-brand">
                <div className="brand-text brand-big visible text-uppercase">
                  <strong className="text-primary">Dark</strong>
                  <strong>Admin</strong>
                </div>
                <div className="brand-text brand-sm">
                  <strong className="text-primary">D</strong>
                  <strong>A</strong>
                </div>
              </Link>
              {/*  Sidebar Toggle Btn */}
              <button className="sidebar-toggle">
                <i className="fa fa-long-arrow-left"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
