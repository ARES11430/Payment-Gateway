import loading from '../loading.gif';
import React, { Component } from 'react';
import eth from '../eth.png';
import './App.css';

class Loading extends Component {

  render() {
    return (
      
                    <a
                        href="http://www.vistochain.com"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <img src={loading} style={{ width: 800 ,height: 500 }} alt="logo" />
                      </a>

    );
  }
}

export default Loading;