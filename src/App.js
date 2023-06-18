import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // const filterData = (searchTerm) => {
  //   const filtered = data.filter((record) =>
  //     Object.values(record).some((value) =>
  //       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
   // setFilteredData(filtered);
  //};

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const ITEMS_PER_PAGE = 50;
  const offset = currentPage * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(offset, offset + ITEMS_PER_PAGE);

  const csvHeaders = [
    { 
      label: 'First Name', 
      key: 'first_name'
     },
    { 
      label: 'Last Name', 
      key: 'last_name'
     },
    {
       label: 'Email', 
       key: 'email' 
      },
    { 
      label: 'Phone Number',
       key: 'phone_number' 
      },
 
  ];

  return (
    <div className='justify-center flex items-center'>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
      
        </thead>
        <tbody>

          {
          paginatedData.map((record, index) => (
            <tr key={index}>
              <td>{record.first_name}</td>
              <td>{record.last_name}</td>
              <td>{record.email}</td>
              <td>{record.phone_number}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <CSVLink
        data={filteredData}
        headers={csvHeaders}
        filename={'dashboard.csv'}
      >
        Download as CSV
      </CSVLink>
    </div>
  );
};

export default Dashboard;