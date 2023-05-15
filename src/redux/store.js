import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice';

export default configureStore({
  reducer: {
    person: personReducer
  }
})