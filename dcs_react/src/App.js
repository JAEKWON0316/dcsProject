import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './assets/Header';
import Main from './components/Main';
import Notice from './components/Notice';
import Footer from './assets/Footer'
import Content from './components/content'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/board/:role" element={<Notice />} />
          <Route path="/board/:role/:id" element={<Content />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
