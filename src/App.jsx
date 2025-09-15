import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard.jsx';
import ContractDetail from './components/ContractDetail.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contract/:id" element={<ContractDetail />} />
      </Routes>
    </Router>
  );
}

export default App;