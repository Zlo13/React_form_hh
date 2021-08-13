import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import "./Form.scss";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [date, setDate] = useState("");

  const [emailDirty, setEmailDirty] = useState(false);
  const [surnameDirty, setSurnameDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [telDirty, setTelDirty] = useState(false);
  const [dateDirty, setDateDirty] = useState(false);

  const [emailError, setEmailError] = useState("Поле является обязательным");
  const [surnameError, setSurnameError] = useState("Поле является обязательным");
  const [nameError, setNameError] = useState("Поле является обязательным");
  const [telError, setTelError] = useState("Поле является обязательным");
  const [dateError, setDateError] = useState("Поле является обязательным");

  const [formValid, setFormValid] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert(`
    Форма валидна, отправляется запрос...
    Фамилия: ${surname}
    Имя: ${name}
    Телефон: ${tel}
    email: ${email}
    Дата рождения: ${date}
    `);
  };

  useEffect(() => {
    if (emailError || surnameError || nameError || telError || dateError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, surnameError, nameError, telError, dateError]);

  const emailHandler = (event) => {
    setEmail(event.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setEmailError("Введен некоректный адрес почты");
      if (!event.target.value.trim()) {
        setEmailError("Поле является обязательным");
      }
    } else {
      setEmailError("");
    }
  };

  const surnameHandler = (event) => {
    setSurname(event.target.value.trim());
    if (!event.target.value.trim()) {
      setSurnameError("Поле является обязательным");
    } else {
      setSurnameError("");
    }
  };
  const nameHandler = (event) => {
    setName(event.target.value.trim());
    if (!event.target.value.trim()) {
      setNameError("Поле является обязательным");
    } else {
      setNameError("");
    }
  };
  const telHandler = (event) => {
    const reTel = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
    setTel(event.target.value);
    if(!reTel.test(String(event.target.value).toLowerCase())){
      setTelError("Введен некоректный номер телефона");
      if (!event.target.value) {
        setTelError("Поле является обязательным");
      }
    }else {
      setTelError("");
    }

  };
  const dateHandler = event => {
    setDate(event.target.value)
    if (!event.target.value.trim()) {
      setDateError("Поле является обязательным");
    } else {
      setDateError("");
    }
  }

  const blurHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "surname":
        setSurnameDirty(true);
        break;
      case 'name':
        setNameDirty(true)
        break;
      case 'tel':
        setTelDirty(true)
        break;
      case 'date':
        setDateDirty(true)
        break;
      default:
    }
  };



  return (
    <div className="wrapper form__wrapper">
      <h2 className="form__title">Информация о сотруднике</h2>

      <form className="form" onSubmit={(event) => onSubmitHandler(event)}>
        <div className="form__required-field form__surname">
          <input
            onChange={(event) => surnameHandler(event)}
            onBlur={(event) => blurHandler(event)}
            className={
              surnameDirty && surnameError
                ? "form__input form__input_error"
                : "form__input"
            }
            name="surname"
            type="text"
            placeholder="Фамилия"
          />
          {surnameDirty && surnameError && (
            <div className="form__error">{surnameError}</div>
          )}
        </div>

        <div className="form__required-field form__name">
          <input
            onChange={(event) => nameHandler(event)}
            onBlur={(event) => blurHandler(event)}
            className={
              surnameDirty && surnameError
                ? "form__input form__input_error"
                : "form__input"
            }
            name="name"
            type="text"
            placeholder="Имя"
          />
          {nameDirty && nameError && (
            <div className="form__error">{nameError}</div>
          )}
        </div>

        <input
          className="form__input"
          name="secondName"
          type="text"
          placeholder="Отчество"
        />

        <select className="form__input form__gender" name="gender">
          <option value="male">Мужской</option>
          <option value="female ">Женский</option>
        </select>

        <div className="form__required-field form__date">
          <input
            onChange={event => dateHandler(event)}
            onBlur={event => blurHandler(event)}
            className={dateDirty && dateError? 'form__input form__input_error': 'form__input'}
            type="date"
            name='date'
          />
          {dateDirty && dateError && (
            <div className="form__error">{dateError}</div>
          )}
        </div>

        <div className="form__required-field form__phone">
          <InputMask
            onChange={event => telHandler(event)}
            onBlur={event => blurHandler(event)}
            className={surnameDirty && surnameError? 'form__input form__input_error': 'form__input'}
            name='tel'
            mask="+7(999)-999-99-99"
            placeholder="Мобильный телефон"
          />
          {telDirty && telError && (
            <div className="form__error">{telError}</div>
          )}
        </div>

        <div className="form__required-field form__email">
          <input
            onChange={(event) => emailHandler(event)}
            onBlur={(event) => blurHandler(event)}
            // className="form__input"
            className={
              emailDirty && emailError
                ? "form__input form__input_error"
                : "form__input"
            }
            name="email"
            type="email"
            placeholder="Email"
          />
          {emailDirty && emailError && (
            <div className="form__error">{emailError}</div>
          )}
        </div>

        <input
          className="form__input"
          type="text"
          name="address"
          placeholder="Адрес постоянной регистрации"
        />
        <input
          className="form__input"
          type="text"
          name="companyName"
          placeholder="Название работодателя"
        />



        <input
          disabled={!formValid}
          type="submit"
          value="Сохранить"
          className="form__btn"
        />
      </form>
    </div>
  );
};
