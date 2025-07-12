// components/ProfileCard.jsx
import Link from 'next/link';
import { UserCircle } from 'lucide-react';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
      <div className="flex-shrink-0">
        {user.profilePhotoUrl ? (
          <img
            src={user.profilePhotoUrl}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
        ) : (
          <UserCircle size={96} className="text-gray-500" />
        )}
      </div>
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-2">{user.name}</h3>
        {user.location && <p className="text-gray-400 text-sm mb-2">Location: {user.location}</p>}
        <div className="mb-2">
          <p className="text-gray-300 text-sm font-semibold">Skills Offered:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsOffered?.map((skill, index) => (
              <span key={index} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-300 text-sm font-semibold">Skills Wanted:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsWanted?.map((skill, index) => (
              <span key={index} className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        {user.availability && <p className="text-gray-400 text-sm mt-2">Availability: {user.availability}</p>}
        {user.rating !== undefined && (
          <p className="text-gray-400 text-sm mt-2">Rating: {user.rating?.toFixed(1) || 'N/A'}/5</p>
        )}
      </div>
      <div className="flex-shrink-0 mt-4 md:mt-0">
        <Link href={`/users/${user._id}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors font-semibold">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;