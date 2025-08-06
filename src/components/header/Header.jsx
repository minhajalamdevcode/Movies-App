import React, { useState } from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <img className="header__icon" src="https://files.readme.io/29c6fee-blue_short.svg" alt="logo" />
                </Link>
                <div className="navLinks">
                    <Link to="/movies/popular"><span>Popular</span></Link>
                    <Link to="/movies/top_rated"><span>Top Rated</span></Link>
                    <Link to="/movies/upcoming"><span>Upcoming</span></Link>
                </div>
            </div>

            <div className="mobileMenuIcon" onClick={toggleMenu}>
                {menuOpen ? <IoMdClose /> : <FaBars />}
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="mobileMenu">
                    <Link to="/movies/popular" onClick={toggleMenu}><span>Popular</span></Link>
                    <Link to="/movies/top_rated" onClick={toggleMenu}><span>Top Rated</span></Link>
                    <Link to="/movies/upcoming" onClick={toggleMenu}><span>Upcoming</span></Link>
                </div>
            )}
        </div>
    )
}

export default Header
