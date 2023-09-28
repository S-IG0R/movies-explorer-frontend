import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { useState } from 'react';

function App() {
  
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="page">
      <Header />
      <Routes>
        {/* <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to={paths.main} replace />
            ) : (
              <Navigate to={paths.login} replace />
            )
          }
        /> */}
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
