import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Home'
import Garden1 from './Pages/Garden1';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import BookmarkPage from './Pages/Bookmark';
import { AuthProvider } from './Pages/AuthContext';
import Garden2 from './Pages/Garden2';

function App() {

  return (
    <>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Garden" element={<Garden1 />} />
          <Route path="/Garden2" element={<Garden2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
