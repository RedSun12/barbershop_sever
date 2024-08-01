// import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './ProfilePage.css';
import { useAppSelector } from '../../redux/hooks';
import axiosInstance from '../../axiosInstance';
import { useDispatch } from 'react-redux';
import { editUserNameById, editUserSurNameById } from '../../redux/thunkActions';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { getUserById } from '../../redux/thunkActions';

type TUser = {
  username: string;
  usersurname: string;
  avatar: string;
};

export default function ProfilePage(): ReactElement {
  const user = useAppSelector((store) => store.userSlice.user);
  const [userName, setUserName] = useState(user.username || '');
  const [userSurName, setUserSurName] = useState(user.usersurname || '');
  const [userAvatar, setUserAvatar] = useState(user.avatar || '');
  const [visibilityUserName, setVisibilityUserName] = useState(false);
  const [visibilityUserSurName, setVisibilityUserSurName] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://w1168615.yclients.com/widgetJS';
    script.charset = 'UTF-8';
    document.body.appendChild(script);
  }
  
  const handlerUserNameChange = async () => {
  //   const response = await axiosInstance.patch(`api/v1/edit/userName/${localStorage.getItem('userId')}`,  
  //   {
  //     data: {username: userName},
  //   },
  // ); 
    dispatch(editUserNameById({username: userName}))
}

  const handlerUserSurNameChange = async () => {
  //   const response = await axiosInstance.patch(`api/v1/edit/userSurName/${localStorage.getItem('userId')}`,  
  //   {
  //     data: {username: userSurName},
  //   },
  // )
  dispatch(editUserSurNameById({usersurname: userSurName}))
}

  const handlerUserAvatarChange = async () => {
    const response = await axiosInstance.patch(`api/v1/edit/userAvatar/${localStorage.getItem('userId')}`,  
    {
      data: {username: userAvatar},
    },
  )}

  useEffect(() => {
    loadScript();
  }, []);

  return (
    <div className="profile-container">
          {/* <button 
    onClick={() => navigate(`/edituser/${user.id}`)}
    className='qq'
    >Изменить</button> */}
      <img className="avatar"src={user.avatar} alt="avatar" />

      <button onClick={()=>setVisibilityUserName((prev)=>!prev)}>изменить имя</button>
      {visibilityUserName 
      ? <> 
      <input placeholder='изменить имя' 
      value={userName} 
      onChange={(e)=>setUserName(e.target.value)}/> 
       <button onClick={()=>{
        handlerUserNameChange(); 
        setVisibilityUserName(false)
      }}>саве</button> 
      </>
      : <h2 className="welcome-message">имя, {user.username}!</h2>}

      <button onClick={()=>setVisibilityUserSurName((prev)=>!prev)}>изменить фамилию</button>
      {visibilityUserSurName 
      ? <>
      <input placeholder='изменить фамилию' 
      value={userSurName} 
      onChange={(e)=>setUserSurName(e.target.value)}/> 
      <button onClick={()=>{
        handlerUserSurNameChange(); 
        setVisibilityUserSurName(false)
      }}>саве</button> 
      </>
      : <h2 className="welcome-message">фамилия1, {user.usersurname}!</h2>}
      <div>
      <a href="w1168615.yclients.com/widgetJS" 
      className="ms_booking" 
      onClick={loadScript()}>Узнать свободные места</a>
      </div>
    </div>
  );
}