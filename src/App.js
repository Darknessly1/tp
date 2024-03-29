import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DetailsPage from './detailPage/DetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import Wishlist from './Wishlist'; 
import './App.css'; 

function App() {
  
  const [data, setData] = useState({
    search: '',
    year: '',
    type: '',
  });

  const [inputSearch, setInputSearch] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleImageClick = (id) => {
    setSelectedMovieId(id);
  };

  const handleClick = () => {
    fetch(`https://www.omdbapi.com/?apikey=4d94a812&s=${data.search}&y=${data.year}&type=${data.type}`)
      .then(resp => resp.json())
      .then(resp => setInputSearch(resp.Search || []));
  }
  return (
    <Provider store={store}>
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">My Movie App</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className="fas fa-heart"></i> Wishlist
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="row container mt-3">
              <form className='search-container'>
                <div className=" col-3 form-group search-input">
                  <input
                    className="form-control"
                    name="search"
                    value={data.search}
                    onChange={handleChange}
                    placeholder="Search..."
                  />
                </div>
                <div className="col-3 form-group search-input">
                  <input
                    className="form-control"
                    name="year"
                    value={data.year}
                    onChange={handleChange}
                    placeholder="Year"
                  />
                </div>
                <div className="col-3 form-group search-input">
                  <select
                    className="form-control"
                    name="type"
                    onChange={handleChange}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                    <option value="episode">Episode</option>
                  </select>
                </div>
                <button 
                  type="button"
                  className=" col-3 btn btn-primary search-button" 
                  onClick={handleClick}
                >
                  Search
                </button>
              </form>

              {inputSearch && inputSearch.map(item => (
                <div key={item.imdbID} className="card mt-3">
                  <div className="card-body card-container">
                    <h5 className="card-title">{item.Title}</h5>
                    <p className="card-text">{item.Year}</p>
                    <Link
                      to="/details"
                      state={{ selectedMovieId: item.imdbID }}
                    >
                      <img
                        src={item.Poster}
                        alt={item.Title}
                        className="img-fluid"
                        onClick={() => handleImageClick(item.imdbID)}
                      />
                    </Link>
                    <p className="card-text">{item.Type}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <Route
          path="/details"
          element={<DetailsPage selectedMovieId={selectedMovieId} />}
        />
        <Route
            path="/wishlist"
            element={<Wishlist />}
        />
      </Routes>
    </Router>
    </Provider>
  );

}

export default App;
