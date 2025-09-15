import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import axios from 'axios';
import Button from './Button.jsx';

function ContractDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userData } = useSelector((state) => state.authorization);

  // State for contract data and UI
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch contract details
  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/contract-details.json');
        const contractData = response.data.find((c) => c.id === id);
        if (contractData) {
          setContract(contractData);
          setLoading(false);
        } else {
          setError('Contract not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load contract details');
        setLoading(false);
      }
    };
    fetchContract();
  }, [id]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  // Toggle evidence drawer
  const toggleEvidence = () => {
    setIsEvidenceOpen(!isEvidenceOpen);
  };

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-cyan-400 p-2 rounded-full bg-black/30 backdrop-blur-md hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/30 backdrop-blur-md border-r border-cyan-400/50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-extrabold text-cyan-400 shadow-cyan-500/50 mb-6 font-serif">
            Saas Contracts
          </h2>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="block py-2 px-4 rounded-md bg-cyan-500/50 text-cyan-200 font-medium hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
            >
              Contracts
            </Link>
            <button className="block py-2 px-4 rounded-md text-cyan-200/80 hover:bg-black/50 hover:ring-2 hover:ring-cyan-500 w-full text-left transition-all duration-300">
              Insights
            </button>
            <button className="block py-2 px-4 rounded-md text-cyan-200/80 hover:bg-black/50 hover:ring-2 hover:ring-cyan-500 w-full text-left transition-all duration-300">
              Reports
            </button>
            <button className="block py-2 px-4 rounded-md text-cyan-200/80 hover:bg-black/50 hover:ring-2 hover:ring-cyan-500 w-full text-left transition-all duration-300">
              Settings
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-8 ${isSidebarOpen ? 'ml-0' : 'md:ml-64'} transition-all duration-300 ease-in-out`}>
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6 bg-black/30 backdrop-blur-md rounded-xl p-4 shadow-md border border-cyan-400/50">
          <h1 className="text-3xl font-extrabold text-cyan-400 shadow-cyan-500/50 uppercase">
            Contract Details
          </h1>
          <div className="relative group">
            <button className="flex items-center space-x-2 text-cyan-200 hover:text-cyan-100 transition-all duration-300">
              <span>{userData?.username || 'User'}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-black/30 backdrop-blur-md rounded-md shadow-md border border-cyan-400/50 hidden group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-cyan-200 hover:bg-black/50 hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-block mb-6 text-cyan-200 font-medium hover:text-cyan-100 transition-all duration-300"
        >
          &larr; Back to Dashboard
        </Link>

        {/* Contract Content */}
        {loading ? (
          <div className="p-8 text-center text-cyan-200/80 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-cyan-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading contract details...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-pink-400 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        ) : contract ? (
          <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md p-8 border border-cyan-400/50">
            {/* Metadata */}
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-cyan-400 shadow-cyan-500/50 mb-4 uppercase">
                {contract.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-cyan-200/80">Parties</p>
                  <p className="text-lg font-medium text-cyan-200">{contract.parties}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-200/80">Start Date</p>
                  <p className="text-lg font-medium text-cyan-200">{contract.start}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-200/80">Expiry Date</p>
                  <p className="text-lg font-medium text-cyan-200">{contract.expiry}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-200/80">Status</p>
                  <p className="text-lg font-medium text-cyan-200">{contract.status}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-200/80">Risk Score</p>
                  <p className="text-lg font-medium text-cyan-200">{contract.risk}</p>
                </div>
              </div>
            </div>

            {/* Clauses Section */}
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-cyan-400 shadow-cyan-500/50 mb-4 uppercase">
                Clauses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contract.clauses.map((clause, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/50 rounded-lg shadow-md border border-cyan-400/50 hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
                  >
                    <h4 className="text-lg font-medium text-cyan-200">{clause.title}</h4>
                    <p className="text-sm text-cyan-200/80 mt-1">{clause.summary}</p>
                    <p className="text-sm text-cyan-200/60 mt-1">
                      Confidence: {(clause.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-cyan-400 shadow-cyan-500/50 mb-4 uppercase">
                AI Insights
              </h3>
              <div className="space-y-4">
                {contract.insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border border-cyan-400/50 hover:ring-2 hover:ring-cyan-500 transition-all duration-300 ${
                      insight.risk === 'High'
                        ? 'bg-pink-500/20 text-pink-400'
                        : insight.risk === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-cyan-500/20 text-cyan-200'
                    }`}
                  >
                    <p className="text-sm font-medium">Risk: {insight.risk}</p>
                    <p className="text-sm">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Drawer */}
            <div>
              <Button
                onClick={toggleEvidence}
                className="mb-4 bg-cyan-500/50 text-cyan-200 hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 backdrop-blur-md border border-cyan-400/50 rounded-md transition-all duration-300"
              >
                {isEvidenceOpen ? 'Hide Evidence' : 'Show Evidence'}
              </Button>
              <div
                className={`fixed top-0 right-0 h-full w-80 bg-black/30 backdrop-blur-md shadow-md border-l border-cyan-400/50 transform transition-transform duration-300 ease-in-out ${
                  isEvidenceOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-extrabold text-cyan-400 shadow-cyan-500/50 uppercase">
                      Evidence
                    </h3>
                    <button
                      onClick={toggleEvidence}
                      className="text-cyan-200 hover:text-cyan-100 transition-all duration-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {contract.evidence.length === 0 ? (
                    <p className="text-cyan-200/80">No evidence available</p>
                  ) : (
                    <div className="space-y-4">
                      {contract.evidence.map((evidence, index) => (
                        <div
                          key={index}
                          className="p-4 bg-black/50 rounded-lg border border-cyan-400/50 hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
                        >
                          <p className="text-sm font-medium text-cyan-200">
                            Source: {evidence.source}
                          </p>
                          <p className="text-sm text-cyan-200/80">{evidence.snippet}</p>
                          <p className="text-sm text-cyan-200/60">
                            Relevance: {(evidence.relevance * 100).toFixed(0)}%
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ContractDetail;