import React from 'react';
import { useEffect } from 'react';
import LoginForm from '../components/Profile/LoginForm';
import UserProfile from '../components/Profile/UserProfile';
import AdminProfile from '../components/Profile/AdminProfile';
import DEOProfile from '../components/Profile/DEOProfile';
import { useGlobalState } from '../components/Layout/GlobalState';


export default function Profile () {
    const { currentUserData, setCurrentUserData } = useGlobalState();

    useEffect(() => {
        setCurrentUserData({
          'username': 'SamC',
          'firstName': 'Sam',
          'lastName': 'Convoy',
          'isAdmin': 0,
          'isDataEntryOperator': 0,
          'bookingsCount': 15,
          'category': 'Frequent'
          });
    }, [setCurrentUserData]);

    return (
      <div className="wrapper">
        {renderPage(currentUserData)}
      </div>);
};


function renderPage(userData) {
  if (userData.username === null) {
      return <LoginForm/>
  } else if (Boolean(userData.isAdmin) === true) {
      return <AdminProfile userData={userData}/>
  } else if (Boolean(userData.isDataEntryOperator) === true) {
      return <DEOProfile userData={userData}/>
  } else if (Boolean(userData.isDataEntryOperator) === false && Boolean(userData.isAdmin) === false){
      return <UserProfile userData={userData}/>
  }
}

