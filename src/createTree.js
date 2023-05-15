import React, { useState } from "react";
import { useDispatch } from "react-redux";
import createPerson from "./javascript/createPerson";
import { setPerson } from "./redux/personSlice";

export default function CreateTree() {
  const [isCreateModeActive, setActiveMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const dispatch = useDispatch();

  const createTargetPerson = () => {
    const targetPerson = createPerson(firstName, lastName, fatherName, dateOfBirth, gender)
    dispatch(setPerson({
      targetPerson,
      children: {},
      parents: {},
      activePerson: null
    }))
  }

  return <div>
    {!isCreateModeActive 
      ? <button onClick={() => setActiveMode(true)}>Создать дерево</button>
      : <form>
          <label htmlFor="firstName">Имя</label>
          <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} /* readOnly={isActive ? false : true} *//>

          <label htmlFor="lastName">Фамилия</label>
          <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label htmlFor="fatherName">Отчество</label>
          <input id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} />

          <label htmlFor="gender">Пол</label>
          <input id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />

          <label htmlFor="dateOfBirth">Дата рождения</label>
          <input id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

          <button type="button" onClick={createTargetPerson}>Создать начальный элемент</button>
        </form>
    }
  </div>
}