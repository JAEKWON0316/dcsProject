import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './assets/Header';
import Main from './components/Main';
import Notice from './components/Notice';
import Footer from './assets/Footer'
import Content from './components/content'
import Summary from './components/Summary';
import Greeting from './components/Greeting';
import Vision from './components/Vision';
import OrganizationChart from './components/OrganizationChart';
import BoardMembers from './components/BoardMembers';
import RegionalOffices from './components/RegionalOffices';
import History from './components/History';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/board/:role" element={<Notice />} />
          <Route path="/board/:role/:id" element={<Content />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/greeting' element={<Greeting />} />
          <Route path='/vision' element={<Vision />} />
          <Route path='/organizationchart' element={<OrganizationChart />} />
          <Route path='/boardmembers' element={<BoardMembers />} />
          <Route path='/regionaloffices' element={<RegionalOffices />} />
          <Route path='history' element={<History />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
