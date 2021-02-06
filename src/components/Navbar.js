import React, { Component } from 'react'
import logo from '../logo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.vistochain.com"
          target="_blank"
          rel="noopener noreferrer"
        >
         <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp;درگاه پرداخت هوشمند اتریوم 
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <big className="text-secondary">
              <big id="account" style={{ color: 'white' }}>{this.props.account} آدرس کیف پول شما</big>
            </big>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
