

import React, { useEffect, useState } from 'react';
function Crud() {

  return (
    <div className="container">
      <AddList />
    </div>

  )
}

function AddList() {
  const getLocalLists = () => {
    let list = localStorage.getItem('lists');
    if (list) {
      return JSON.parse(localStorage.getItem('lists'))
    } else {
      return [];
    }
  }

  const [inputUser, setInputUser] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [lists, setLists] = useState(getLocalLists());
  const [editClick, setEditClick] = useState(true);
  const [updateIndex, setUpdateIndex] = useState("");
  // const [searchUser, setSearchIndex] = useState("");
  const [searchTerm, setSearchTerm] = useState('');


// Create Item
  const addItems = () => {
    if (!(inputUser) || !(inputAddress) || !(inputCity)) { }
    else {
      setLists([...lists, [inputUser, inputAddress, inputCity]]);
      setInputUser('');
      setInputAddress('');
      setInputCity('');
    }
  }
  // update Item
  const update = () => {
    updateIndex[0] = inputUser;
    updateIndex[1] = inputAddress;
    updateIndex[2] = inputCity;
    setEditClick(true);
    setInputUser('');
    setInputAddress('');
    setInputCity('');

    setLists([...lists])
  }

  // Edit Item
  const edit = (id) => {
    
    const editList = lists[id];
    setInputUser(editList[0]);
    setInputAddress(editList[1]);
    setInputCity(editList[2]);
    setEditClick(false)
    setUpdateIndex(editList);
  }
  const deleteItem = (id) => {
    let delItem = lists[id];
    let itemIndex = lists.indexOf(delItem);
    lists.splice(itemIndex, 1);
    setLists([...lists]);
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = lists.filter((item) =>
  item[0].toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <div>
      <div class="addUser">
        <div>
          <input type="search" value={searchTerm} placeholder="Search here.." onChange={handleSearch}></input>
        </div>
              
        <input type="text" name="name" placeholder='Enter Your name' required value={inputUser}
          onChange={(e) => { setInputUser(e.target.value) }}></input>
        <input type="text" name="address" placeholder='Enter your Address' required
          value={inputAddress}
          onChange={(e) => { setInputAddress(e.target.value) }}></input>
        <select value={inputCity} required
          onChange={(e) => { setInputCity(e.target.value) }}>
          <option value="" selected>Select City</option>
          <option value="islamabad">Islamabad</option>
          <option value="lahore">Lahore</option>
          <option value="rawalpindi">Rawalpindi</option>
          <option value="karachi">Karachi</option>
          <option value="peshawar">Peshawar</option>
        </select>
        {
          editClick ? <button onClick={() => addItems()}>ADD</button> :
            <button onClick={() => update()}>UPDATE</button>
        }
      </div>

      <div className='showUsers'>
        {

          <div>
            <table>
              {
                lists.map((elem, ind) => (
                  <div key={ind}>
                    <tr>
                      <td>{elem[0]}</td>
                      <td>{elem[1]}</td>
                      <td>{elem[2]}</td>
                      <td>
                        <button className='edit' onClick={() => edit(ind, elem)}>Edit</button>
                        <button className='del' onClick={() => deleteItem(ind)}>Delete</button>
                      </td>
                    </tr>
                  </div>
                ))
              }

            </table>
          </div>

        }

      </div>

      <div>
      <ul>
      {
      searchTerm?
      
      filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact[0]}</td>
              <td>{contact[1]}</td>
              <td>{contact[2]}</td>
              <td>
                        <button className='edit' onClick={() => edit(index)}>Edit</button>
                        <button className='del' onClick={() => deleteItem(index)}>Delete</button>
                      </td>
            </tr>
          ))
        :""
        }
      </ul>
      </div>
    </div>
  )
}
export default Crud;