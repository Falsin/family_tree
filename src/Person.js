/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setActivePerson } from "./redux/personSlice";

function Person({personId, coords, className}) {
  const foreignObject = useRef(null);
  const width = 150;
  const height = 90;

  const dispatch = useDispatch()

  const person = useSelector(state => {
    return state.person.children[personId] || state.person.parents[personId] || state.person.targetPerson
  })
  const targetPerson = useSelector(state => state.person.targetPerson)

  const defineActivePerson = () => {
    dispatch(setActivePerson(personId));
  }

  return <foreignObject ref={foreignObject} onClick={defineActivePerson} className={className} width={width} height={height} style={{x: coords.x, y: coords.y, transform: `translate(${-width/2}px, ${-height/2}px)`}}>
      <div className={targetPerson.id == personId ? "target" : ""}>
        <p>{person.firstName}</p>
        <p>{person.lastName}</p>
        <p>{person.fatherName}</p>
        <p>{person.gender}</p>
        <p>{person.dateOfBirth}</p>
      </div>
  </foreignObject>
}

const StyledPerson = styled(Person)`
  overflow: visible;
  position: relative;

  div {
    border: solid black 1px;

    p {
      box-sizing: border-box;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    &.target {
      background: rgba(0,0,255, 0.5);
    }
  }
`

export default React.memo(StyledPerson, (prevProps, nextProps) => {
  const prevCoords = prevProps.coords;
  const nextCoords = nextProps.coords;
  return prevCoords.x == nextCoords.x && prevCoords.y == nextCoords.y
})