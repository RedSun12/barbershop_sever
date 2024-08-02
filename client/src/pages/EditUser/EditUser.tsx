import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';
import AddPicture from "./Component/AddPicture.js";
import axios from "axios";
import "./EditUser.css";
import { accessToken } from "../../axiosInstance.js";
import { getCookies } from "../../utils/utility.js"

type TUser = {
  username: string;
  usersurname: string;
  avatar: string;
};

export default function EditUser() {
  const [userEdit, setUserEdit] = useState<TUser | null>(null);
  const [getAccessToken, setGetAccessToken] = useState<string>('');
  // console.log(getCookies('accessToken'));
  
  const navigate = useNavigate();
  const params = useParams();
  const [createUser, setCreateUser] = useState({});
  const [validateFormFields, setValidateFormFields] = useState({
    nameUser: true,
    usersurname: true,
    avatar: true,
  });

  const getUserInfo = (userId) => {
    axios.get(
      `http://localhost:3100/api/one/user/${userId}`
    )
    .then((data) => {
      console.log(data.data.item);
      setCreateUser({...createUser, 
        username: data.data.item.username,
        usersurname: data.data.item.usersurname,
        avatar: data.data.item.avatar,
      })
    })
    .catch((error) => {
      console.error('Ошибка при получении данных пользователя:', error);
    });
  }

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setCreateUser({ ...createUser, userId: String(user.id) });
    }
  };

  const NAME_USER_REGEX = /^[а-яА-Яa-zA-Z0-9\s]{4,50}$/;
  const DESCRIPTION_REGEX = /^[а-яА-Яa-zA-Z0-9]{4,255}$/;
  const PRISE_REGEX = /^(?:[1-9]\d{0,5}|1000000)$/;

  const validateTextFields = (form) => {
    setValidateFormFields({
      ...validateFormFields,
      nameUser: NAME_USER_REGEX.test(form.nameUser),
    });

    return {
      nameUser: NAME_USER_REGEX.test(form.nameUser),
      usersurname: DESCRIPTION_REGEX.test(form.usersurname),
    };
  };

  const validateFormImg = (file) => {
    let result = false;
    let newFile = null;
    const arr = file?.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Невозможно определить MIME-тип");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    newFile = new File([u8arr], "", { type: mime });
    const allowedFormatsRegex = /^(image\/jpeg|image\/svg\+xml|image\/png)$/;
    const isAllowedFormat = allowedFormatsRegex.test(newFile.type);
    const isFileSizeValid = newFile.size <= 1000000;

    if (!isAllowedFormat) {
      setValidateFormFields({ ...validateFormFields, avatar: false });
      return false;
    }
    if (!isFileSizeValid) {
      setValidateFormFields({ ...validateFormFields, avatar: false });
      return false;
    }
    if (isAllowedFormat && isFileSizeValid) {
      setValidateFormFields({ ...validateFormFields, avatar: true });
      return true;
    }
    return result;
  };

  const handleClickUpdate = async () => {
    console.log("handleClickUpdate called");
    if (createUser.avatar) {
      console.log("Avatar exists");
      const validImg = validateFormImg(createUser.avatar);
      console.log("Valid image:", validImg);
      const validForm = Object.values(
        validateTextFields({
          nameUser: createUser.username,
          usersurname: createUser.usersurname,
        })
      ).every((elem) => elem);
      console.log("Valid form:", validForm);
      if (validImg && validForm) {
        console.log("Updating user...");
        try {
          const result = await axios.put(
            `http://localhost:3100/api/edit/user/${params.id}`,
            {
              data: createUser,
            },
          );
          console.log("Update result:", result);
          if (result.status === 200) {
            navigate("/profile")
          }
        } catch(error) { 
          console.log("Update error:", error);
        }
      }
    }
  }

  const handleClickSave = async () => {
    if (createUser.avatar) {
      const validImg = validateFormImg(createUser.avatar);
      const validForm = Object.values(
        validateTextFields({
          nameUser: createUser.username,
          namesurname: createUser.usersurname,
        })
      ).every((elem) => elem);
      if (validImg && validForm) {
        try {
          await axios.post(
            `http://localhost:3100/api/add/user`,
            createUser,
            { withCredentials: true }
          );
          navigate("/profile");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };


  
//   useEffect(() => {
//     setGetAccessToken(accessToken)
//   }, []);
// console.log(getAccessToken);

  return (
    <div className="editBox">
      <h1 className="editTitle">Редактирование профиля</h1>
      <input
        className={validateFormFields.nameUser ? "normalUser" : "error"}
        placeholder="Введите имя"
        type="text"
        value={createUser.username}
        onChange={(e) =>
          setCreateUser({ ...createUser, username: String(e.target.value) })
        }
      />
      <input
        className="normalUserDesc"
        placeholder="Введите фамилию"
        type="text"
        value={createUser.usersurname}
        onChange={(e) =>
          setCreateUser({ ...createUser, usersurname: String(e.target.value) })
        }
      />
      <AddPicture
        createUser={createUser}
        setCreateUser={setCreateUser}
        validateFormFields={validateFormFields}
        setValidateFormFields={setValidateFormFields}
      />
      <button className="editBtn" onClick={handleClickUpdate}>Изменить</button>
    </div>
  );
}