import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';

const RedirectMiddleware: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const restrictedPaths = ['/add', '/edit', '/delete', '/details'];
    // Get the current URL path
    const currentPath = window.location.pathname;

    if (restrictedPaths.includes(currentPath)) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RedirectMiddleware />

      <div className='bg-white relative w-full max-w-[1600px] mx-auto h-full'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
