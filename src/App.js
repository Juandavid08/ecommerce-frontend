import React, { useEffect, useState } from 'react';
import { graphqlRequest } from './utils/api';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/productDetail';
import Dashboard from './pages/dashboard';
import LoginForm from './components/loginForm';
import Home from './pages/home';

const GET_USER_QUERY = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      name
      lastName
      userType
      createdAt
    }
  }
`;

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      graphqlRequest(GET_USER_QUERY, { id: userId }, token)
        .then((res) => setUser(res.data.getUser))
        .catch((err) => {
          console.error('Error al recuperar usuario:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        });
    }
  }, []);


  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<LoginForm onLogin={(userData) => { localStorage.setItem('userId', userData.id); setUser(userData); }} />} />
        ) : (
          <>
            <Route path="/" element={<Home user={user} setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard products={products} setProducts={setProducts} />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
