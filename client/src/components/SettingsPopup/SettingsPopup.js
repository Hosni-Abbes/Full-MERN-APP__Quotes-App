import React from 'react';

import './SettingsPopup.css';


function SettingsPopup(props) {
  

  return (
    <div className='user-settings popup_mult_class'>
      <span className='' onClick={()=>{props.setSettingsForm('ch_user'); props.setSettingsOptions(false) }}>Change username</span>
      <span className='' onClick={()=>{props.setSettingsForm('ch_email'); props.setSettingsOptions(false) }} >Change email</span>
      <span className='' onClick={()=>{props.setSettingsForm('ch_pass'); props.setSettingsOptions(false) }} >Change password</span>
    </div>
  );
}

export default SettingsPopup;