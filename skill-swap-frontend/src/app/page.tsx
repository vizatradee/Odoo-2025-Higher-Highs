'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, UserCircle } from 'lucide-react';

// Mock data for demonstration
const mockUsers = [
  {
    _id: '1',
    name: 'Alice Johnson',
    skillsOffered: ['React', 'JavaScript', 'CSS'],
    skillsWanted: ['Python', 'Machine Learning'],
    rating: 4.8,
    photo: null,
    availability: 'weekends'
  },
  {
    _id: '2',
    name: 'Bob Smith',
    skillsOffered: ['Python', 'Data Science'],
    skillsWanted: ['React', 'Frontend Development'],
    rating: 4.5,
    photo: null,
    availability: 'evenings'
  },
  {
    _id: '3',
    name: 'Carol Davis',
    skillsOffered: ['UI/UX Design', 'Figma'],
    skillsWanted: ['JavaScript', 'Web Development'],
    rating: 4.9,
    photo: null,
    availability: 'weekends'
  }
];

const ProfileCard = ({ user }: { user: any }) => {
  const handleRequest = () => {
    alert(`Request sent to ${user.name}`);
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-6 shadow mb-4">
      <div className="flex items-center gap-6">
        {user.photo ? (
          <img src={user.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-700" />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700 border-2 border-gray-600">
            <UserCircle size={48} className="text-gray-400" />
          </div>
        )}
        <div>
          <div className="text-xl font-semibold text-white">{user.name}</div>
          <div className="text-green-400 text-sm mt-1">
            Skills Offered =>{' '}
            {user.skillsOffered?.map((skill: string) => (
              <span key={skill} className="inline-block bg-gray-800 px-2 py-1 rounded mr-1 text-xs">{skill}</span>
            ))}
          </div>
          <div className="text-blue-400 text-sm mt-1">
            Skill wanted =>{' '}
            {user.skillsWanted?.map((skill: string) => (
              <span key={skill} className="inline-block bg-gray-800 px-2 py-1 rounded mr-1 text-xs">{skill}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          className="bg-cyan-700 text-white px-5 py-2 rounded hover:bg-cyan-900 transition-colors"
          onClick={handleRequest}
        >
          Request
        </button>
        <div className="text-gray-300 text-sm">rating: {user.rating?.toFixed(1) || 'N/A'}/5</div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [publicUsers, setPublicUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Filter users based on search and availability
  const filteredUsers = publicUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAvailability = availabilityFilter === '' || user.availability === availabilityFilter;
    
    return matchesSearch && matchesAvailability;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, availabilityFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl text-white tracking-wider font-bold">Skill Swap Platform</h1>
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
              <option value="">All Availability</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="weekdays">Weekdays</option>
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
          {currentUsers.length === 0 ? (
            <p className="text-center text-gray-400">No profiles found matching your criteria.</p>
          ) : (
            currentUsers.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border-2 border-gray-400/40 bg-gray-950 px-6 py-6 shadow-lg"
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
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-800 text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
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
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-800 text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {/* Demo Notice */}
        <div className="mt-8 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
          <p className="text-blue-300 text-sm text-center">
            🚀 This is a demo version with mock data. The backend integration is ready for implementation.
          </p>
        </div>
      </div>
    </div>
  );
}