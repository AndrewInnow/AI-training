import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from './types/user';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import './styles/App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`${API_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.userId !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (!token) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>User Management</h1>
        </header>
        <main className="app-main">
          <div className="login-container">
            <h2>Please log in to continue</h2>
            <button
              onClick={async () => {
                  const response = await axios.post(`${API_URL}/api/users/login`, {
                    email: 'Sincere@april.biz',
                    password: 'password123'
                  });
                  const newToken = response.data.token;
                  localStorage.setItem('token', newToken);
                  setToken(newToken);
              }}
              className="login-button"
            >
              Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            setToken(null);
          }}
          className="logout-button"
        >
          Logout
        </button>
      </header>
      <main className="app-main">
        <UserTable 
          users={users} 
          onUserClick={handleUserClick}
          onDeleteUser={handleDeleteUser}
        />
      </main>
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App; 