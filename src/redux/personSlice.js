import { createSlice } from '@reduxjs/toolkit';
import { nanoid, createSelector } from '@reduxjs/toolkit';

export const personSlice = createSlice({
  name: "person",
  initialState: {activePerson: null},
  reducers: {
    setPerson: (state, action) => {
      console.log(action)
      state.targetPerson = action.payload.targetPerson;
      state.children = action.payload.children;
      state.parents = action.payload.parents;
    },
    changePersonData: (state, action) => {
      const reqiredChildren = state.children[action.payload.id];
      const reqiredParent = state.parents[action.payload.id];

      if (reqiredChildren) {
        state.children[action.payload.id] = {
          ...state.children[action.payload.id],
          ...action.payload
        }
      } else if (reqiredParent) {
        state.parents[action.payload.id] = {
          ...state.parents[action.payload.id],
          ...action.payload
        }
      } else {
        state.targetPerson = {
          ...state.targetPerson,
          ...action.payload
        }
      }
    },
    addParent: {
      reducer: (state, action) => {
        state.parents[action.payload.obj.id] = action.payload.obj;

        const reqiredChildren = state.children[action.payload.currentPersonId];
        const reqiredParent = state.parents[action.payload.currentPersonId];

        if (reqiredChildren) {
          state.children[action.payload.currentPersonId].parents.push(action.payload.obj.id)
        } else if (reqiredParent) {
          state.parents[action.payload.currentPersonId].parents.push(action.payload.obj.id)
        } else {
          state.targetPerson.parents.push(action.payload.obj.id);
        }
      },
      prepare: (obj, currentPersonId) => {
        return {
          payload: {
            obj: {
              ...obj,
              id: nanoid(),
              children: [currentPersonId],
              parents: [],
            },
            currentPersonId
          }
        }
      }
    },
    addChild: {
      reducer: (state, action) => {
        state.children[action.payload.obj.id] = action.payload.obj;

        const reqiredChildren = state.children[action.payload.currentPersonId];
        const reqiredParent = state.parents[action.payload.currentPersonId];

        if (reqiredChildren) {
          state.children[action.payload.currentPersonId].children.push(action.payload.obj.id)
        } else if (reqiredParent) {
          state.parents[action.payload.currentPersonId].children.push(action.payload.obj.id)
        } else {
          state.targetPerson.children.push(action.payload.obj.id);
        }
      },
      prepare: (obj, currentPersonId) => {
        return {
          payload: {
            obj: {
              ...obj,
              id: nanoid(),
              children: [],
              parents: [currentPersonId],
            },
            currentPersonId
          }
        }
      }
    },
    setActivePerson: (state, action) => {
      state.activePerson = action.payload
    },
    removePerson: (state, action) => {
      const reqiredChildren = state.children[action.payload];
      const reqiredParent = state.parents[action.payload];

      if (reqiredChildren) {
        const parents = state.children[action.payload].parents;

        parents.forEach(id => {
          if (state.children[id]) {
            const requiredId = state.children[id].children.indexOf(action.payload);
            state.children[id].children.splice(requiredId, 1)
          }
        });

        delete state.children[action.payload];
      } else if (reqiredParent) {
        const children = state.parents[action.payload].children;

        children.forEach(id => {
          if (state.parents[id]) {
            const requiredId = state.parents[id].parents.indexOf(action.payload);
            state.parents[id].parents.splice(requiredId, 1)
          }
        });

        delete state.parents[action.payload];
      }

      if (state.targetPerson.children.includes(action.payload)) {
        const requiredId = state.targetPerson.children.indexOf(action.payload);
        state.targetPerson.children.splice(requiredId, 1);
      } else if (state.targetPerson.parents.includes(action.payload)) {
        const requiredId = state.targetPerson.parents.indexOf(action.payload);
        state.targetPerson.parents.splice(requiredId, 1);
      } 
    }
  }
})

export const getRelatives = createSelector(
  [state => state.person.children, state => state.person.parents, state => state.person.targetPerson],
  (children, parents, targetPerson) => Object.assign({}, children, parents, {[targetPerson.id]: targetPerson})
)

export const { setPerson, changePersonData, addParent, setActivePerson, addChild, removePerson } = personSlice.actions;

export default personSlice.reducer;