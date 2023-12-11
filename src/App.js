import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './component/UserTable';
import SearchBar from './component/SearchBar';
import Pagination from './component/Pagination';
import './App.css';


function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      <UserTable users={filteredUsers} setUsers={setUsers} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
