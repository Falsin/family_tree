/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { addParent, changePersonData, addChild, removePerson } from "./redux/personSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfoBlock from "./InfoBlock";
import CreateTree from "./createTree";

function ManageField({className}) {
  const activePerson = useSelector(state => {
    const activePersonId = state.person.activePerson;
    if (activePersonId) {
      return state.person.children[activePersonId] || state.person.parents[activePersonId] || state.person.targetPerson;
    } else {
      return null;
    }
  });

  const targetPerson = useSelector(state => state.person.targetPerson);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activePerson) {
      setFirstName(activePerson.firstName)
      setLastName(activePerson.lastName)
      setFatherName(activePerson.fatherName)
      setGender(activePerson.gender)
      setDateOfBirth(activePerson.dateOfBirth)
    }
  }, [activePerson])

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [isChanged, setChangedMode] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (activePerson && (activePerson.firstName != firstName 
        || activePerson.lastName != lastName 
        || activePerson.fatherName != fatherName 
        || activePerson.gender != gender  
        || activePerson.dateOfBirth != dateOfBirth)) {
      setChangedMode(true)
    } else {
      setChangedMode(false)
    }
  }, [firstName, lastName, fatherName, gender, dateOfBirth])

  const changeData = () => {
    const obj = {
      firstName,
      lastName,
      fatherName,
      gender,
      dateOfBirth,
      id: activePerson.id
    }

    dispatch(changePersonData(obj))
  }
  
  const createParent = () => {
    if (convertDate(dateOfBirth) < convertDate(activePerson.dateOfBirth)) {
      const obj = {
        firstName,
        lastName,
        fatherName,
        gender,
        dateOfBirth,
      }
  
      dispatch(addParent(obj, activePerson.id));
      setError("");

    } else {
      setError("Дата рождения родителя должна быть раньше, чем у его потомка")
    }
  }

  function convertDate (string) {
    let splitedStr = string.split("/")
    return new Date(+splitedStr[2], splitedStr[1] - 1, +splitedStr[0])
  }

  const createChild = () => {
    if (convertDate(dateOfBirth) > convertDate(activePerson.dateOfBirth)) {
      const obj = {
        firstName,
        lastName,
        fatherName,
        gender,
        dateOfBirth,
      }
  
      dispatch(addChild(obj, activePerson.id));
      setError("");
    } else {
      setError("Дата рождения потомка должна быть позже, чем у его родителя")
    }
  }

  const deletePerson = () => {
    dispatch(removePerson(activePerson.id))
  }

  return <div className={className}>
    {!activePerson
    ? "Не выбрано ни одного человека"
    : <form>
        <label htmlFor="firstName">Имя</label>
        <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} /* readOnly={isActive ? false : true} *//>

        <label htmlFor="lastName">Фамилия</label>
        <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="fatherName">Отчество</label>
        <input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />

        <label htmlFor="gender">Пол</label>
        <input id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />

        <label htmlFor="dateOfBirth">Дата рождения<span>{error}</span></label>
        <input id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

        <div>
          <button type="button" onClick={changeData} disabled={isChanged ? false : true}>Изменить</button>
          <button type="button" onClick={deletePerson} disabled={targetPerson.id != activePerson.id ? false : true}>Удалить</button>
          <button type="button" onClick={createParent} disabled={isChanged ? false : true}>Добавить как родитель</button>
          <button type="button" onClick={createChild} disabled={isChanged ? false : true}>Добавить как ребёнок</button>
        </div>
      </form>
    }
      <InfoBlock />
      <CreateTree />
  </div>
}

const StyledManageField = styled(ManageField)`
  form {
    label {
      width: 100%;
      position: relative;

      span {
        position: absolute;
        left: 0;
        top: 100%;
        color: red;
      }
    }

    input {
      margin: 16px 0 2px 0;
      height: 20px;
    }

    display: flex;
    flex-direction: column;
  }
`

export default StyledManageField;