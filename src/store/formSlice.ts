import { createSlice } from '@reduxjs/toolkit';
import { ERROR_TEXT } from 'constants/constants';
import { IFormData } from 'types/customTypes';

interface IForm {
  form: IFormData;
  fileName: string;
  isformChanged: boolean;
  formErrors: boolean;
}

const initialState: IForm = {
  form: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    gender: '',
    agree: '',
    file: '',
  },
  fileName: ERROR_TEXT.fileNotSelected,
  isformChanged: false,
  formErrors: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.form.firstName = action.payload.firstName;
      state.form.lastName = action.payload.lastName;
      state.form.dateOfBirth = action.payload.dateOfBirth;
      state.form.country = action.payload.country;
      state.form.gender = action.payload.gender;
      state.form.agree = action.payload.agree;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setFile: (state, action) => {
      state.form.file = action.payload;
    },
    resetForm: (state) => {
      state.form.firstName = '';
      state.form.lastName = '';
      state.form.dateOfBirth = '';
      state.form.country = '';
      state.form.gender = '';
      state.form.agree = '';
      state.form.file = '';
      state.fileName = ERROR_TEXT.fileNotSelected;
    },
    setFormState: (state, action) => {
      state.isformChanged = action.payload;
    },
    setErrors: (state, action) => {
      state.formErrors = action.payload;
    },
  },
});

export const { setFormData, setFileName, setFile, resetForm, setFormState, setErrors } =
  formSlice.actions;
export default formSlice.reducer;
