/* eslint-disable react/prop-types */
import React from "react";
import { createRoot } from "react-dom/client";
import StyledTree from "./Tree";
import StyledManageField from "./ManageField";
import { defaultCase, children, parents } from "./javascript/createPerson";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { setPerson } from "./redux/personSlice";

function App() {
  if (!localStorage.length) {
    store.dispatch(setPerson({
      targetPerson: defaultCase,
      children: children,
      parents: parents
    }))
  } else {
    store.dispatch(setPerson({
      targetPerson: JSON.parse(localStorage.targetPerson),
      children: JSON.parse(localStorage.children),
      parents: JSON.parse(localStorage.parents),
      activePerson: JSON.parse(localStorage.activePerson),
    }))
  }

  useSelector(state => {
    const appState = state.person
    Object.entries(appState).map(([key, val]) => localStorage[key] = JSON.stringify(val))
  });

  return <div style={{display: "flex"}}>
    <StyledTree/>
    <StyledManageField/>
    </div>
}

const root = createRoot(document.getElementById("root"));
root.render(<Provider store={store} >
    <App />
  </Provider>
)