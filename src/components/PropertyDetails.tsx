import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleProperties } from '../data/properties';
import { Bed, Bath, DollarSign, MapPin, Check } from 'lucide-react';

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const property = sampleProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Property not found</div>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment processed successfully!');
      setIsProcessing(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <img
            src={property.image_url}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-gray-600">{property.location}</span>
              </div>
            </div>
            <div className="flex items-center text-2xl font-bold text-indigo-600">
              <DollarSign className="h-6 w-6" />
              <span>{property.price}</span>
              <span className="text-gray-500 text-base ml-1">/month</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{property.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Bed className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-gray-600">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-6 w-6 text-gray-400" />
              <span className="ml-2 text-gray-600">{property.bathrooms} Bathrooms</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-2 text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing Payment...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}