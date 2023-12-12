import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllCoursesApi,
  requestCreateCourseApi,
  requestDeleteCourseApi,
  requestUpdateCourseApi,
  requestGetCourseApi
} from '~/api/course';

import {
  getAllCourseRequest,
  getAllCoursesuccess,
  getAllCourseFail,
  deleteCourseRequest,
  deleteCoursesuccess,
  deleteCourseFail,
  addCourseRequest,
  addCoursesuccess,
  addCourseFail,
  getCourseRequest,
  getCoursesuccess,
  getCourseFail,
  updateCourseRequest,
  updateCoursesuccess,
  updateCourseFail,
  reGetAllCourseRequest
} from '~/store/slices/rootAction';

function* requestAllCourseSaga(action) {
  try {
    const data = yield call(getAllCoursesApi, action.payload);

    yield put(
      getAllCoursesuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllCourseFail(error?.message || 'Get all course failed!'));
  }
}

function* requestDeleteCourseSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    yield call(requestDeleteCourseApi, action.payload);
    yield put(deleteCoursesuccess(action.payload));
    yield put(reGetAllCourseRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(deleteCourseFail(error?.message || 'Delete user failed!'));
  }
}

function* requestAddCourseSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    const data = yield call(requestCreateCourseApi, action.payload);
    yield put(addCoursesuccess(data));
    yield put(reGetAllCourseRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(addCourseFail(error?.message || 'Add user failed!'));
  }
}

function* requestGetCourseSaga(action) {
  try {
    const data = yield call(requestGetCourseApi, action.payload);
    yield put(getCoursesuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getCourseFail(error?.message || 'Get user info failed!'));
  }
}

function* requestUpdateCourseSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateCourseApi, action.payload);
    yield put(updateCoursesuccess(data));
    yield put(reGetAllCourseRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(updateCourseFail(error?.message || 'Update user info failed!'));
  }
}

export default function* watchCourse() {
  yield takeLatest(getAllCourseRequest.type, requestAllCourseSaga);
  yield takeLatest(deleteCourseRequest.type, requestDeleteCourseSaga);
  yield takeLatest(addCourseRequest.type, requestAddCourseSaga);
  yield takeLatest(getCourseRequest.type, requestGetCourseSaga);
  yield takeLatest(updateCourseRequest.type, requestUpdateCourseSaga);

  yield takeLatest(
    [reGetAllCourseRequest.type, updateCourseRequest.type, addCourseRequest.type, deleteCourseRequest.type, getAllCourseRequest.type],
    requestAllCourseSaga
  );
}
