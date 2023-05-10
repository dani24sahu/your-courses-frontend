import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], lectures:[] },
  {
    // ---------------------------------------------Get All Courses------------------------------
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSucces: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------------------------------------Get A Course------------------------------
    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------------------------------------Add To Playlist------------------------------
    addToPlaylisRequest: state => {
      state.loading = true;
    },
    addToPlaylisSucces: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylisFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---------------------------------------------Toaster------------------------------
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
