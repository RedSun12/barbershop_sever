import { useState } from 'react';
import './AddPicture.css';
import { useDispatch } from 'react-redux';
import { editUserAvatarById } from '../../../redux/thunkActions';
import { useAppSelector } from '../../../redux/hooks';

export default function AddPicture() {
  const user = useAppSelector((store) => store.userSlice.user);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Функция для конвертации файла в строку base64
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Обработчик изменений при загрузке через input
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await handleFile(file);
    }
  };

  // Обработчик сброса изображения
  const handleReset = () => {
    setImageFile(null);
  };

  // Обработка события при перетаскивании файлов
  const handleDrop = async (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await handleFile(file);
    }
  };

  // Универсальный обработчик файлов
  const handleFile = async (file: File) => {
    try {
      const base64String = await toBase64(file);
      setImageFile(base64String);
      
      // Отправка на сервер (раскомментируйте, когда будете готовы)
      // dispatch(editUserAvatarById({ avatar: base64String }));
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {user.avatar && (
        <div className="fileWindow">
          <img style={{ width: "130px", height: "140px" }} src={user.avatar} alt="User Avatar" />
          <img className='imgReset' src='./crest.png' onClick={handleReset} style={{ cursor: 'pointer' }} alt="Reset Avatar" />
          <button onClick={() => dispatch(editUserAvatarById({ avatar: imageFile }))}>
            Save
          </button>
        </div>
      )}
      {!user.avatar && (
        <form 
          className="formed" 
          onDragOver={(e) => e.preventDefault()} 
          onDrop={handleDrop}
        >
          <label className="labeled">
            <img className="imgDownload" src='../../../img/upload102.png' alt="Upload" />
            <input 
              className='inputed' 
              type="file" 
              accept="image/*" 
              onChange={handleChange} 
            />
          </label>
        </form>
      )}
    </>
  );
};
