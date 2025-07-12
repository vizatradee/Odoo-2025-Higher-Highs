// pages/index.jsx
import { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import { users } from '../lib/api';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const [publicUsers, setPublicUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Example pagination

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await users.getPublicUsers(searchQuery, availabilityFilter);
      setPublicUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, availabilityFilter]); // Refetch when filters change

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = publicUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(publicUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full max-w-4xl py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Skill Swap Platform</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search by skill (e.g., Photoshop, Excel)"
            className="w-full pl-10 pr-4 py-2 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative">
          <select
            className="w-full md:w-auto px-4 py-2 rounded-md appearance-none bg-gray-800 border border-gray-700 pr-8"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="">Availability (Any)</option>
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
            {/* Add more availability options as needed */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading users...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : publicUsers.length === 0 ? (
        <p className="text-center text-gray-400">No public profiles found.</p>
      ) : (
        <>
          {currentUsers.map((user) => (
            <ProfileCard key={user._id} user={user} />
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;