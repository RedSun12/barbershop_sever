import React, { ReactElement, useEffect, useState } from 'react';
import './ProfilePage.css';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { editUserAvatarById, editUserNameById, editUserSurNameById } from '../../redux/thunkActions';
import AddPicture from '../EditUser/Component/AddPicture';
import { Avatar } from '@chakra-ui/react';

export default function ProfilePage(): ReactElement {
  const user = useAppSelector((store) => store.userSlice.user);
  const [userName, setUserName] = useState(user?.username || '');
  const [userSurName, setUserSurName] = useState(user?.usersurname || '');
  const [userAvatar, setUserAvatar] = useState(user?.avatar || '');
  const [visibilityUserName, setVisibilityUserName] = useState(false);
  const [visibilityUserSurName, setVisibilityUserSurName] = useState(false);
  const [visibilityUserAvatar, setVisibilityUserAvatar] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true); 
  const dispatch = useDispatch();

  const handlerUserNameChange = () => {
    dispatch(editUserNameById({ username: userName }));
  };

  const handlerUserSurNameChange = () => {
    dispatch(editUserSurNameById({ usersurname: userSurName }));
  };

  const handlerUserAvatarChange = () => {
    dispatch(editUserAvatarById({ avatar: userAvatar }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="profile-container">
      {loadingVisible && (
        <div className="loading-screen">
          <div className="loader">
            <img src='/load1.png' alt="Loading" className="loading-image" /> 
            <img src='/load2.png' alt="Loading" className="loading-image spinning" /> 
          </div>
        </div>
      )}
      
      <button onClick={() => setVisibilityUserAvatar((prev) => !prev)}>изменить аватар</button>
      {user?.avatar ?
      visibilityUserAvatar?
      <AddPicture/>
      :
      <img style={{width:'40px', height:'30px'}} src={user?.avatar} alt='avatar'/> 

        : <Avatar  width={'55px'} height={'60px'} backgroundColor={'gray'} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.username}`} alt="avatar" />
      }

      <button onClick={() => setVisibilityUserName((prev) => !prev)}>изменить имя</button>
      {visibilityUserName ? (
        <>
          <input
            placeholder='изменить имя'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={() => {
            handlerUserNameChange();
            setVisibilityUserName(false);
          }}>
            сохранить
          </button>
        </>
      ) : (
        <h2 className="welcome-message">имя, {user?.username}!</h2>
      )}

      <button onClick={() => setVisibilityUserSurName((prev) => !prev)}>изменить фамилию</button>
      {visibilityUserSurName ? (
        <>
          <input
            placeholder='изменить фамилию'
            value={userSurName}
            onChange={(e) => setUserSurName(e.target.value)}
          />
          <button onClick={() => {
            handlerUserSurNameChange();
            setVisibilityUserSurName(false);
          }}>
            сохранить
          </button>
        </>
      ) : (
        <h2 className="welcome-message">фамилия, {user?.usersurname}!</h2>
      )}

      <div>
        <a href="w1168615.yclients.com/widgetJS" className="ms_booking">
          Узнать свободные места
        </a>
      </div>
    </div>
  );
}
