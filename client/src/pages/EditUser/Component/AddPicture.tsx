import { useState } from 'react';
import './AddPicture.css';
import { useDispatch } from 'react-redux';
import { editUserAvatarById } from '../../../redux/thunkActions';
import { useAppSelector } from '../../../redux/hooks';

export default function AddPicture() {
  const user = useAppSelector((store) => store.userSlice.user);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const description = "Загрузите изображение";
  const dispatch = useDispatch();

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e: any) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64String: string = await toBase64(file);
        setImageFile(base64String);
        // dispatch(editUserAvatarById({avatar:base64String}));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const handleSave = async () => {

  // }

  const handleDrag = (e: any) => {
    e.preventDefault();
  };

  const handleLeave = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      try {
        const base64String = await toBase64(file);
        setImageFile(base64String);
        // dispatch(editUserAvatarById({avatar:base64String}));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReset = () => {
    if (imageFile) {
      setImageFile(null)
    }
  };

  return (
    <>
      {user.avatar && (
        <ul className="fileList">
          <div className="fileWindow">
            <img style={{ width: "130px", height: "140px" }} src={user.avatar} />
            {/* {!validateFormFields.avatar && <p style={{ color: "red" }}>Неподходящий формат или размер</p>} */}
            <img className='imgReset' src='./crest.png' onClick={handleReset} size={15} />
          </div>
          <button onClick={()=>dispatch(editUserAvatarById({avatar:imageFile}))}>save</button>
        </ul>
      )}
      {!user.avatar && (
        <form className="formed" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
          <label className="labeled">
            <img className="imgDownload" src='../../../img/upload102.png'/>
            {/* {createUser.usersurname && <span>{createUser.usersurname}</span>} */}
            <input className='inputed' type="file" accept="image/, .png, .jpg, .svg" onChange={handleChange} />
          </label>
        </form>
      )}
    </>
  );
};