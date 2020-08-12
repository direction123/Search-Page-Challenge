import React from 'react';
import logo from './app-icon.svg';
import './App.css';
import '@tradeshift/tradeshift-ui';
import '@tradeshift/tradeshift-ui/ts.css';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      searchStr: "",
      countries: [],
      searchResults: [],
      isLoading: false,
      loaded: false,
      modalItem: null,
      error: "",
    }
  }

  componentDidMount() {
    axios({ method: "get", url: "http://localhost:8888/countries" })
      .then(response => {
        this.setState({
          countries: response.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCountryChange = (e) => {
    this.setState({
      country: e.target.value
    })
  }

  handleSearchChange = (e) => {
    this.setState({
      searchStr: e.target.value
    })
  }

  handleSearch = () => {
    const {country, searchStr} = this.state;
    if (!country || country.length === 0) {
      this.setState({
        error: "Please select a country"
      })
      return;
    } else if (!searchStr || searchStr.length === 0) {
      this.setState({
        error: "Please input a search string"
      })
      return;
    } else {
      this.setState({
        error: ""
      })
    }
    this.setState({
      isLoading: true,
      loaded: false
    });
    axios({ method: "get", url: "http://localhost:8888/searchResults" })
      .then(response => {
        this.setState({
          searchResults: response.data,
          isLoading: false,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showModal = (item) => {
    this.setState({
      modalItem: item
    })
  }

  hideModalHandler = () => {
    this.setState({
      modalItem: null
    })
  }

  render() {
    const {country, searchStr, countries, searchResults, isLoading, loaded, modalItem, error} = this.state;
    
    const countryOption = countries.map((item) => {
      return (
        <option key={item.code} value={item.code}>{item.name}</option>
      )
    })
    const resultItem = searchResults.map((item) => {
      return (
        <ol key={item.id} className="list-item" onClick = {() => this.showModal(item)}>
          <p className="item-title">{item.name}</p>
          <p>{item.address}</p>
        </ol>
      )
    })
    return (
      <div className="App">
        <header className="app-header">
          <img src={logo} className="header-logo" alt="logo" />
          <span className="header-text">Tradeshift Global Search</span>
        </header>
        <h1>Tradeshift Global Search</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        {error && error.length > 0 && <p className="error-msg">{error}</p>}
        <form data-ts="Form">
          <fieldset>
            <label>
              <select value={country} onChange={this.handleCountryChange}>
                <option value="">Please Select</option>
                {countryOption}
              </select>
            </label>
          </fieldset>
        </form>
        <input className="search-input"
          placeholder="Search"
          value={searchStr}
          onChange={this.handleSearchChange}
        />
        <i className="ts-icon-search" 
          onClick={this.handleSearch} 
        />
        { isLoading && <p>isLoading...</p>}
        { loaded && 
          <div>
            <p>Search Results for "{searchStr}"</p>
            <ul>{resultItem}</ul>
          </div>
        }
        { modalItem && <div className="modal">
          <div className="modal-container">
            <div className="header">
              <div className="title">Company Information</div>
              <i className="ts-icon-close close-icon" onClick={this.hideModalHandler} />
            </div>
            <div className="body">
              <div className="context">
                <h5>{modalItem.name}</h5>
                  <p className="result-title">Compnay Status: <span className="result-status">{modalItem.status}</span></p>
                  <p className="result-title">COMPANY REGISTRATION NUMBER</p><p>{modalItem.registrationNumber}</p>
                  <p className="result-title">VAT NUMBER</p><p>{modalItem.vatNumber}</p>
                  <p className="result-title">REGISTERED ADDRESS</p><p>{modalItem.address}</p>
                  <p className="result-title">COUNTRY</p><p>{modalItem.country}</p>
                  <p className="result-title">ADDITIONAL STATUS DETAILS</p><p>{modalItem.additionalStatusDetails}</p>
                  <p className="result-title">COMPANY DESCRIPTION </p><p>{modalItem.description}</p>
                </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
  }
  

export default App;
