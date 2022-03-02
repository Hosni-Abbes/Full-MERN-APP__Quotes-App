import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Profile from './Pages/Profile/Profile';

import Header from './components/Header/Header';
import CreatePost from './components/Posts/CreatePost';
import ClickUserIconPopup from './components/ClickUserIconPopup/ClickUserIconPopup';
import EditPost from './components/Posts/EditPost';
import EditMyPost from './components/Posts/EditMyPost';
import SettingsPopup from './components/SettingsPopup/SettingsPopup';
import SettingsForms from './components/SettingsPopup/SettingsForms';

//import UserContext
import { UserContext } from './Context/UserContext';

import './App.css';


function App() {
  //get the user data when user login
  const { user } = useContext(UserContext);

  const [clickUserIcon, setClickUserIcon] = useState(false);
  const [createNewPost, setCreateNewPost] = useState(false);
  const [editThePost, setEditThePost] = useState({case:false, postId:'', postDesc:''});
  const [editMyPost, setEditMyPost] = useState(false);
  const [settingsOptions, setSettingsOptions] = useState(false);
  const [settingsForm, setSettingsForm] = useState('');

  //if user is loged in => register it to localStorage 
  if(user !== null) localStorage.setItem('userConnected', JSON.stringify(user));


  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={ user ? <Home Header={Header} setClickUserIcon={setClickUserIcon} setEditThePost={setEditThePost} setCreateNewPost={setCreateNewPost} />
                                              : <Signup /> }
        />
        <Route path="/login" element={ user ? <Navigate to='/' /> : <Login /> } />
        <Route path="/signup" element={ user ? <Navigate to='/' /> : <Signup /> } />
        <Route path="/profile/:username" element={ user ? <Profile Header={Header} setClickUserIcon={setClickUserIcon} setEditThePost={setEditThePost} setCreateNewPost={setCreateNewPost}  /> :  <Signup /> } />
        <Route path="/:any" element={ user ? <Navigate to='/' /> : <Signup /> } />
      </Routes>


        {/* CREATE NEW POST COMP */}
        {createNewPost? <CreatePost setCreateNewPost={setCreateNewPost} /> : null}

        {/* EDIT POST */}
        {editThePost.case ? <EditPost setEditThePost={setEditThePost} editThePost={editThePost} setEditMyPost={setEditMyPost} /> : null }
        {/* EDIT MY POST (FORM SHOWN WHEN CONFIRM EDIT POST) */}
        {editMyPost? <EditMyPost setEditMyPost={setEditMyPost} updatePost={editThePost} setEditThePost={setEditThePost} /> : null }

        {/* CLICK ON USER ICON AND SHOW OPTIONS (GOING TO PROFILE/CREATE NEW POST/SETTINGS/LOGOUT/) */}
        {clickUserIcon? <ClickUserIconPopup user={user} setClickUserIcon={setClickUserIcon}  setCreateNewPost={setCreateNewPost} setSettingsOptions={setSettingsOptions} /> : null }
      
        {/* SHOW SETTINGS OPTIONS WHEN CLICK ON SETTINGS */}
        {settingsOptions && <SettingsPopup setSettingsForm={setSettingsForm} setSettingsOptions={setSettingsOptions} />}

        {/* SHOW THE FORM OF CLICKED OPTION OF SETTINGS (CHANGE USERNAME OR EMAIL OR PASSWORD) */}
        {settingsForm !== '' && <SettingsForms settingsForm={settingsForm} />}


      {/* OVERLAY */}
      {
        createNewPost? 
        <div className="overlay" onClick={()=>{setCreateNewPost(false); document.body.classList.remove('hidden')}}></div>
        : editThePost.case? 
        <div className="overlay" onClick={()=>{setEditThePost(false); setEditMyPost(false); document.body.classList.remove('hidden')}}></div>
        : clickUserIcon? 
        <div className="overlay" onClick={()=>{setClickUserIcon(false); setCreateNewPost(false); document.body.classList.remove('hidden')}}></div>
        : settingsOptions? 
        <div className="overlay" onClick={()=>{setSettingsOptions(false); document.body.classList.remove('hidden')}}></div>
        : settingsForm !== ''?
        <div className="overlay" onClick={()=>{setSettingsForm(''); document.body.classList.remove('hidden')}}></div>
        : null
      }
      
    </div>
    </Router>
  );
}

export default App;
