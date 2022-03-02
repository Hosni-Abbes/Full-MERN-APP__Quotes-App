import React from 'react';


function SettingsForms(props) {

  //FUNCTION RENDER CHANGE USERNAME
  function ChangeUsername(){
    return(
      <div className='settings-pop'>
        <div className='settings-top'>
          <span>Change username</span>
        </div>
        <div className='settings-sets'>
          <form className='settings_form'>
            <input className='settings_cur-username' type="text" placeholder='Current username' />
            <input className='settings_new-username' type="text" placeholder='New username' />
            <input className='settings_cur-password' type="password" placeholder='Password' />
            <input type='submit' value='Confirm' />
          </form>
        </div>
      </div>
    )
  }

  //FUNCTION RENDER CHANGE USERNAME
  function ChangeEmail(){
    return(
      <div className='settings-pop'>
        <div className='settings-top'>
          <span>Change email</span>
        </div>
        <div className='settings-sets'>
          <form className='settings_form'>
            <input className='settings_cur-email' type="email" placeholder='Current email' />
            <input className='settings_new-email' type="email" placeholder='New email' />
            <input className='settings_cur-password' type="password" placeholder='Password' />
            <input type='submit' value='Confirm' />
          </form>
        </div>
      </div>
    )
  }

  //FUNCTION RENDER CHANGE USERNAME
  function ChangePassword(){
    return(
      <div className='settings-pop'>
        <div className='settings-top'>
          <span>Change password</span>
        </div>
        <div className='settings-sets'>
          <form className='settings_form'>
            <input className='settings_cur-password' type="password" placeholder='Current password' />
            <input className='settings_new-password' type="password" placeholder='New password' />
            <input className='settings_conf-password' type="password" placeholder='Repeat new password' />
            <input type='submit' value='Confirm' />
          </form>
        </div>
      </div>
    )
  }


  return (
      <React.Fragment>
        { props.settingsForm === 'ch_user' ? <ChangeUsername />
          : props.settingsForm === 'ch_email' ? <ChangeEmail />
          : props.settingsForm === 'ch_pass' ? <ChangePassword />
          : null }
      </React.Fragment>
  );
}

export default SettingsForms;