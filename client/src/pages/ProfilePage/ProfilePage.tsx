import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import './ProfilePage.css';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

type TUser = {
  username: string;
  usersurname: string;
  avatar: string;
};

export default function ProfilePage(): ReactElement {
  const [userData, setUserData] = useState<TUser | null>(null);
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      console.error('userId не найден');
    }
  }, [userId]);

  const fetchUserData = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3100/api/profile/${userId}`);
      console.log('ответ:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
    }
  };

  function loadScript() {
    var script = document.createElement('script');
    script.src = 'https://w1168615.yclients.com/widgetJS';
    script.charset = 'UTF-8';
    document.body.appendChild(script);
  }
  
  useEffect(() => {
    loadScript();
  }, []);

  return (
    <div className="profile-container">
          <button 
    onClick={() => navigate(`/edituser/${user.id}`)}
    className='qq'
    >Изменить</button>
      <img className="avatar"src={user.avatar} alt="avatar" />
      <h2 className="welcome-message">имя, {user.username}!</h2>
      <h2 className="welcome-message">фамилия1, {user.usersurname}!</h2>
      <div>
      <a href="w1168615.yclients.com/widgetJS" className="ms_booking" onClick={loadScript()}>Узнать свободные места</a>
      </div>
    </div>
  );
}