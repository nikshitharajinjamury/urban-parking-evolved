
import React from 'react';

interface Service {
  id: string;
  name: string;
  price: number | string;
  icon: string;
}

interface AdditionalServicesProps {
  services: Service[];
  selectedServices: string[];
  toggleService: (serviceId: string) => void;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({ 
  services, 
  selectedServices, 
  toggleService 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Additional Services</h3>
      <div className="grid grid-cols-1 gap-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`
              border rounded-lg p-3 cursor-pointer
              ${selectedServices.includes(service.id) ? 'border-brand-purple bg-brand-soft-purple' : 'border-gray-200'}
            `}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{service.name}</span>
              <span>
                {typeof service.price === 'number' ? (
                  <span className="flex items-center">
                    <span className="mr-1">₹</span>{service.price}
                  </span>
                ) : (
                  service.price
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;
