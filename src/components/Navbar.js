import React from 'react'
import styles from "../styles/navbar.module.css"
import {Link} from "react-router-dom"
import { useAuth } from '../hooks'
import { useState } from 'react'
import { useEffect } from 'react'
import { searchUsers } from '../api'

export default function Navbar() {
  const [results, setResults] =useState([])
  const [searchText, setSearchText] =useState("")
  const auth = useAuth();

  useEffect(()=>{
    const fetchUsers = async ()=>{
     const response = await searchUsers(searchText)
     if(response.success){
      setResults(response.data.users)
     }
    }

    if(searchText.length > 2){
      fetchUsers()
    }else{
      setResults([])
    }

    
  }, [searchText])

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
      <Link to="/">
        <img alt="logo" className={styles.logo} src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" />
      </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://image.flaticon.com/icons/svg/483/483356.svg"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && <div className={styles.user}>
            <a href="/settings">
                <img alt="user" src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" className={styles.userDp}/>
            </a>
            <span>{auth.user.name}</span>
        </div>}
        <div className={styles.navLinks}>
        <ul>
          {auth.user ? ( <>
            <li onClick={auth.logout}>
                Log out
            </li>
          </>):(
          
          <>
          <li>
                <Link to="/login">Log in</Link>
            </li>
            
            <li>
                <Link to="/register">Register</Link>
            </li>
          </>)}
           
            
           </ul>
        </div>
      </div>
    </div>
  )
}


