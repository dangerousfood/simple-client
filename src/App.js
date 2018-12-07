import React, { Component } from 'react';
import logo from './logo.svg';
import Web3 from 'web3'

import './App.css';

class App extends Component {
  state = {
    web3Connected: false,
    web3Account: undefined,
  }

  async connectToWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        // Request account access if needed
        await window.ethereum.enable()
        console.log('Web3 enabled!')
        console.log(window.web3)
        // window.web3.eth.getAccounts().then(console.log)
        // window.web3.eth.getBlockNumber().then(console.log)
        const accounts = await window.web3.eth.getAccounts()
        this.setState({web3Connected: true, web3Account: accounts[0]})
      } catch (error) {
        // User denied account access...
        console.error(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.log('Legacy web3 detected!')
      const accounts = await window.web3.eth.getAccounts()
      this.setState({web3Connected: true, web3Account: accounts[0]})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    } 
  }

  async componentDidMount() {
    await this.connectToWeb3()
    if (!this.state.web3Connected)
      return console.error('Failed to connect to web3, not able to fetch data')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Account connected: {this.state.web3Account}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
