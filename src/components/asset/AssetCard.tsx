import React from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor } from 'react-icons/fi';
import type { Asset } from '../../types/asset';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link
      to={`/assets/${asset.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {asset.image ? (
            <img
              src={asset.image}
              alt={asset.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
              <FiMonitor className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {asset.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{asset.category}</p>
          <div className="mt-2 flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                asset.status
              )}`}
            >
              {asset.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
