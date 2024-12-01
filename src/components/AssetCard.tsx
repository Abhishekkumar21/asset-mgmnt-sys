import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AssetCardProps {
  id: string;
  name: string;
  category: string;
  status: string;
  imageUrl: string;
  description: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  id,
  name,
  category,
  status,
  imageUrl,
  description,
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => navigate(`/assets/${id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <button 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/request-asset/${id}`);
          }}
        >
          Request Asset
        </button>
      </div>
    </div>
  );
};
