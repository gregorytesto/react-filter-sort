import { useState, useEffect } from 'react';
import './App.css';

import userData from './usersData.json';
import employedData from './employedData.json';

function App() {
  const [ allData, setAllData ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ selectedCohorts, setSelectedCohorts ] = useState([]);
  const [ isEmployed, setIsEmployed ] = useState(false);
  const [ sortOption, setSortOption ] = useState("");
  const [ ascending, setAscending ] = useState(true);


  useEffect(()=>{
      setAllData(userData);
  },[]);

  let handleEmployed = [ ...allData ].concat(isEmployed ? employedData : []);

  let filteredBySearch = handleEmployed.filter((user)=>{
    return user.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  let filterByCohort = filteredBySearch.filter((user)=>{
    if(!selectedCohorts.length) return true;
    return selectedCohorts.includes(user.cohort);
  });

  if(sortOption){
    filterByCohort.sort((a, b)=>{
      if(a[sortOption] > b[sortOption]){
        return ascending === "ascending" ? -1 : 1;
      } else {
        return ascending === "ascending" ? 1 : -1;
      }
    });
  }

  let usersToDisplay = filterByCohort.map(({name, cohort, points_this_month, employed}, index)=>(
    <tr key={name + index} className="user-item">
        <td>{name}</td>
        <td>{cohort}</td>
        <td>{points_this_month}</td>
        <td>{employed}</td>
    </tr>
  ));


  let handleSearchTerm=(e)=>{
    setSearchTerm(e.target.value);
  }

  let handleEmployedInput=(e)=>{
    setIsEmployed(e.target.checked);
  }

  let handleSelectCohort=(e)=>{
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCohorts(value);
  }

  let handleSort=(e)=>{
    setSortOption(e.target.value);
  }

  let handleAscending=(e)=>{
    setAscending(e.target.value);
  }
  
  return (
    <>
      <div>
        <label htmlFor="search">Name</label>
        <input 
          id="search"
          placeholder="Search name here"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <div>
        <label htmlFor="search">Include employed?</label>
        <input 
          type="checkbox"
          value={isEmployed}
          onChange={handleEmployedInput}
        />
      </div>
      <div>
        <select id="cohort" multiple value={selectedCohorts} onChange={handleSelectCohort}>
          <option value="Pursuit-7.1">7.1</option>
          <option value="Pursuit-7.2">7.2</option>
          <option value="Pursuit-8.1">8.1</option>
          <option value="Pursuit-8.2">8.2</option>
        </select>
      </div>
      <div>
        <select value={sortOption} onChange={handleSort}>
        <option value="">--Select a sort option--</option>
          <option value="name">Alphabetically</option>
          <option value="cohort">Cohort</option>
          <option value="points_this_month">Monthly Points</option>
        </select>
      </div>
      <div>
        <select value={ascending} onChange={handleAscending}>
          <option value="">--Ascending?--</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <table id="user-table">
        <thead>
            <tr>
              <th>Name</th>
              <th>Cohort</th>
              <th>Points This Month</th>
              <th>Employed</th>
            </tr>
        </thead>
        <tbody>
            { usersToDisplay }
        </tbody>
      </table>
    </>
  );
}

export default App;
