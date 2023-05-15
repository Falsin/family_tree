/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StyledPerson from "./Person";
import { getRelatives } from "./redux/personSlice";

function Tree({className}) {
  const svg = useRef(null);
  const [startCoords, setStartCoords] = useState(null);

  const person = useSelector(state => state.person.targetPerson);
  const relatives = useSelector(state => getRelatives(state));

  useEffect(() => {
    const size = getComputedStyle(svg.current)
    setStartCoords({
      x: parseFloat(size.width)/2,
      y: parseFloat(size.height)/2
    })
  }, []);

  const coordsObj = !startCoords ? {} : createCoordObj(person, startCoords);

  function createCoordObj(person, startCoords) {
    const coordObj = {};
    
    (function recCalc(person, coordParams) {
      coordObj[person.id] = coordParams;
      const arrayRelatives = person.children.concat(person.parents);

      if (!arrayRelatives.length ) {
        return coordObj;
      }

      return arrayRelatives.reduce((prev, curr) => {
        let x, y, middle;

        if (convertDate(relatives[curr]) < convertDate(person)) {
          middle = (person.parents.length-1)/2;
          const id = person.parents.findIndex((index) => index == curr);
          x = (id-middle)*200+coordParams.x;
          y = coordParams.y-150;
        } else {
          middle = (person.children.length-1)/2;
          const id = person.children.findIndex((index) => index == curr);
          x = (id-middle)*200+coordParams.x;
          y = coordParams.y+150;
        }

        return !coordObj[curr] ? recCalc(relatives[curr], {x, y}) : prev;
      }, coordObj)
    })(person, startCoords)

    return coordObj;
  }

  function convertDate (person) {
    let splitedStr = person.dateOfBirth.split("/")
    return new Date(+splitedStr[2], splitedStr[1] - 1, +splitedStr[0])
  }

  const createLines = () => {
    return Object.entries(coordsObj).reduce((prev, curr) => {
      const [key, val] = curr;

      const start = {x: val.x, y: val.y-45};
      const endPoinstArr = relatives[key].parents.map(id => 
        (coordsObj[id]) ? {x: coordsObj[id].x, y: coordsObj[id].y+45} : null
      )

      return [...prev, endPoinstArr.map(obj => {
        return {start: start, end: obj};
      })]
    }, [])
  }

  const drawLines = () => {
    const arrayCoordsLines = createLines().reduce((prev, curr) => prev.concat(curr), [])
    
    return arrayCoordsLines.map((obj, id) => {
      return <line key={id} x1={obj.start.x} y1={obj.start.y} x2={obj.end.x} y2={obj.end.y} stroke="black"  />
    })
  }

  return <svg ref={svg} className={className} >
    {drawLines()}
    {Object.entries(coordsObj).map(([key, val]) => 
      <StyledPerson key={key} personId={key || person.id} coords={val} />
    )}
  </svg>
}

const StyledTree = styled(Tree)`
  border: solid black 1px;
  width: 800px;
  height: 800px;
`

export default StyledTree;