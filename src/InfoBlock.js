import React, { useState } from "react";
import { getRelatives } from "./redux/personSlice";
import { useSelector } from "react-redux";

export default function InfoBlock() {
  const [inputVal, setInputVal] = useState(null);
  const listPerson = useSelector(state => getRelatives(state));
  const [personInfo, setPersonInfo] = useState(null);
  const [isSearchModeActive, setSearchMode] = useState(false);

  const search = (e) => {
    setInputVal(e.target.value);
    setSearchMode(true);
    setPersonInfo(false);
  }

  const setInfo = (elem) => {
    const {firstName, lastName, fatherName, dateOfBirth, gender} = elem;
    setPersonInfo({firstName, lastName, fatherName, dateOfBirth, gender});
    setSearchMode(false);
  }

  const list = () => {
    const requiredPersonArr = Object.values(listPerson).filter(obj => 
      (obj.lastName + obj.firstName + obj.fatherName).includes(inputVal)
    );

    return <ul>
      {requiredPersonArr.map((elem, id) => <p key={id} onClick={() => setInfo(elem)}>{`${elem.lastName} ${elem.firstName} ${elem.fatherName}`}</p>)}
    </ul>
  }

  return <div>
    <h2>Поиск</h2>
    <div>
      <input placeholder="Имя" onChange={search} value={inputVal}></input>
      {!isSearchModeActive ? null : list()}

      {!personInfo 
        ? null 
        : Object.entries(personInfo).map(([key, val], id) => <p key={id}>{key}: {val}</p>)

      }
    </div>
  </div>
}