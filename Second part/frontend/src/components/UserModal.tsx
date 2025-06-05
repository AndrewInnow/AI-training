import React from 'react';
import { User } from '../types/user';
import { motion, AnimatePresence } from 'framer-motion';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Phone:</span> {user.phone}</p>
                  <p><span className="font-medium">Website:</span> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{user.website}</a></p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <p>{user.address.street}</p>
                  <p>{user.address.suite}</p>
                  <p>{user.address.city}, {user.address.zipcode}</p>
                  <a
                    href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on Map
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Company</h3>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <p><span className="font-medium">Name:</span> {user.company.name}</p>
                  <p><span className="font-medium">Catch Phrase:</span> {user.company.catchPhrase}</p>
                  <p><span className="font-medium">Business:</span> {user.company.bs}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserModal; 