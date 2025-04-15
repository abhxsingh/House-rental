import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Property, Filters } from '../types';
import { Bed, Bath, DollarSign, MapPin } from 'lucide-react';
import { sampleProperties } from '../data/properties';

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredProperties = [...sampleProperties];

      if (filters.location) {
        filteredProperties = filteredProperties.filter(p =>
          p.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => p.bedrooms >= filters.bedrooms!);
      }

      setProperties(filteredProperties);
      setLoading(false);
    }, 500);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter location"
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <div className="mt-1 flex space-x-2">
              <input
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Min"
                onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
              />
              <input
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Max"
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) })}
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}+
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="mt-1 text-gray-500 line-clamp-2">{property.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-500">{property.bathrooms}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-indigo-600">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-semibold">{property.price}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}