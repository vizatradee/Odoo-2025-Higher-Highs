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
  const usersPerPage = 3; // 3 per page to match your wireframe

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
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [searchQuery, availabilityFilter]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = publicUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(publicUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-handwriting text-3xl md:text-4xl text-white tracking-wider">Skill Swap Platform</h1>
          <a
            href="/login"
            className="border border-cyan-400 text-cyan-300 px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 hover:text-white transition"
          >
            Login
          </a>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by skill or name"
              className="w-full bg-gray-800 border border-gray-700 rounded-full pl-12 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" />
          </div>
          <div className="relative w-full md:w-56">
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">Availability</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              {/* Add more as needed */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-cyan-400">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Profiles */}
        <div className="space-y-8">
          {isLoading ? (
            <p className="text-center text-cyan-300">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : currentUsers.length === 0 ? (
            <p className="text-center text-gray-400">No public profiles found.</p>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border-2 border-gray-400/40 bg-gray-950 px-6 py-6 flex items-center justify-between shadow-lg"
              >
                <ProfileCard user={user} />
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-10">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-800 text-cyan-300 disabled:opacity-40"
            >
              <ChevronLeft size={22} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-full font-mono text-lg ${
                  currentPage === i + 1
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-cyan-300 hover:bg-cyan-700 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-800 text-cyan-300 disabled:opacity-40"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
      {/* Optional: Add a subtle background pattern or gradient here */}
    </div>
  );
};

export default HomePage;