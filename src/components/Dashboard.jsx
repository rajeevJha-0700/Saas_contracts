import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../store/authSlice';
import axios from 'axios';
import Input from './Input.jsx';
import Button from './Button.jsx';
import UploadModal from './UploadModal.jsx';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.authorization);

  // State for contracts data and UI
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const contractsPerPage = 10;

  // Fetch contracts from mock API
  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/contracts.json');
        setContracts(response.data);
        setFilteredContracts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contracts. Please try again.');
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  // Handle search and filters
  useEffect(() => {
    let result = contracts;
    if (searchQuery) {
      result = result.filter(
        (contract) =>
          contract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contract.parties.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter((contract) => contract.status === statusFilter);
    }
    if (riskFilter) {
      result = result.filter((contract) => contract.risk === riskFilter);
    }
    setFilteredContracts(result);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, riskFilter, contracts]);

  // Pagination logic
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContracts.slice(
    indexOfFirstContract,
    indexOfLastContract
  );
  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
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
          <h1 className="text-3xl font-extrabold text-cyan-400 shadow-cyan-500/50 uppercase font-serif">Contracts</h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500/50 text-cyan-200 hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 backdrop-blur-md border border-cyan-400/50 rounded-md transition-all duration-300"
            >
              Upload Contract
            </Button>
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
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-black/30 backdrop-blur-md rounded-xl p-4 shadow-md border border-cyan-400/50">
          <Input
            type="text"
            placeholder="Search by name or party"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/3 bg-black/50 text-blue-400 placeholder-blue-400 border border-cyan-400/50 rounded-md focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/50 text-black-500 border border-cyan-100/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all duration-300"
          >
            <option value="" className="bg-gray-900 text-cyan-200">All Statuses</option>
            <option value="Active" className="bg-gray-900 text-cyan-200">Active</option>
            <option value="Expired" className="bg-gray-900 text-cyan-200">Expired</option>
            <option value="Renewal Due" className="bg-gray-900 text-cyan-200">Renewal Due</option>
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-black/50 text-cyan-200 border border-cyan-400/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
          >
            <option value="" className="bg-gray-900 text-cyan-200">All Risks</option>
            <option value="Low" className="bg-gray-900 text-cyan-200">Low</option>
            <option value="Medium" className="bg-gray-900 text-cyan-200">Medium</option>
            <option value="High" className="bg-gray-900 text-cyan-200">High</option>
          </select>
        </div>

        {/* Contracts Table */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-cyan-400/50">
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
              Loading contracts...
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
          ) : filteredContracts.length === 0 ? (
            <div className="p-8 text-center text-cyan-200/80">No contracts yet</div>
          ) : (
            <table className="w-full">
              <thead className="bg-black/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200/80 uppercase tracking-wider">
                    Contract Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200/80 uppercase tracking-wider">
                    Parties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200/80 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200/80 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-cyan-200/80 uppercase tracking-wider">
                    Risk Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-400/50">
                {currentContracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="hover:bg-black/50 hover:ring-2 hover:ring-cyan-500 cursor-pointer transition-all duration-300"
                    onClick={() => navigate(`/contract/${contract.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-200">
                      {contract.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200/80">
                      {contract.parties}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200/80">
                      {contract.expiry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200/80">
                      {contract.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200/80">
                      {contract.risk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {filteredContracts.length > 0 && (
          <div className="mt-4 flex justify-center space-x-2 bg-black/30 backdrop-blur-md rounded-xl p-4 border border-cyan-400/50">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-cyan-500/50 text-cyan-200 rounded-md border border-cyan-400/50 hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 transition-all duration-300 disabled:bg-gray-900/50 disabled:border-gray-900/50 disabled:text-cyan-200/50"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-cyan-200/80">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-cyan-500/50 text-cyan-200 rounded-md border border-cyan-400/50 hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 transition-all duration-300 disabled:bg-gray-900/50 disabled:border-gray-900/50 disabled:text-cyan-200/50"
            >
              Next
            </Button>
          </div>
        )}

        {/* Upload Modal */}
        <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default Dashboard;