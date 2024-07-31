import './AddPicture.css';

export default function AddPicture({ createUser, setCreateUser, validateFormFields, setValidateFormFields }) {
  const description = "Загрузите изображение";

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const base64String = await toBase64(file);
        setCreateUser({ ...createUser, avatar: base64String });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      try {
        const base64String = await toBase64(file);
        setCreateUser({ ...createUser, avatar: base64String });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReset = () => {
    if (createUser.avatar) {
      setCreateUser({ ...createUser, avatar: null });
      setValidateFormFields({ ...validateFormFields, avatar: true });
      return;
    }
  };

  return (
    <>
      {createUser.avatar && (
        <ul className="fileList">
          <div className="fileWindow">
            <img style={{ width: "130px", height: "140px" }} src={createUser.avatar} />
            {!validateFormFields.avatar && <p style={{ color: "red" }}>Неподходящий формат или размер</p>}
            <img className='imgReset' src='../../../img/crest.png' onClick={handleReset} size={15} />
          </div>
        </ul>
      )}
      {!createUser.avatar && (
        <form className="formed" onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleLeave} onDrop={handleDrop}>
          <label className="labeled">
            <img className="imgDownload" src='../../../img/upload102.png'/>
            {createUser.usersurname && <span>{createUser.usersurname}</span>}
            <input className='inputed' type="file" accept="image/, .png, .jpg, .svg" onChange={handleChange} />
          </label>
        </form>
      )}
    </>
  );
};