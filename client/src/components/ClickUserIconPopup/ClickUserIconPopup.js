import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

function ClickUserIconPopup(props) {
  const navigate = useNavigate()

  //SIGNOUT FUNCTION
  const signOut = () => {
    localStorage.removeItem('userConnected')
    navigate(0)
  }

  return (
    <div className='user-options popup_mult_class'>
      <NavLink to={`/profile/${props.user.username}`}className='user_option-goProfile' onClick={()=>{props.setClickUserIcon(false); document.body.classList.remove('hidden') }} >
        <i className='uil uil-user'></i>
        Profile
      </NavLink>
      <span className='user_option-createNewPost' onClick={()=>{props.setCreateNewPost(true); props.setClickUserIcon(false) }}> <i className='uil uil-plus'></i>Create new post</span>
      <span className='user_option-setting' onClick={()=>{props.setClickUserIcon(false); props.setSettingsOptions(true) }} > <i className='uil uil-setting'></i>Settings</span>
      <span className='user_option-signout' onClick={()=>{ signOut() }} > <i className='uil uil-signout'></i>Sign out</span>
    </div>
  );
}

export default ClickUserIconPopup;