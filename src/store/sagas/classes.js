import { put, call, takeLatest } from 'redux-saga/effects';
import { getAllClassApi, requestCreateClassApi, requestDeleteClassApi, requestUpdateClassApi, requestGetClassApi } from '~/api/class';

import {
  getAllClassRequest,
  getAllClassSuccess,
  getAllClassFail,
  getClassRequest,
  getClassSuccess,
  getClassFail,
  addClassRequest,
  addClassSuccess,
  addClassFail,
  deleteClassRequest,
  deleteClassSuccess,
  deleteClassFail,
  updateClassRequest,
  updateClassSuccess,
  updateClassFail,
  reGetAllClassRequest
} from '~/store/slices/rootAction';

function* requestAllClassesSaga(action) {
  try {
    const data = yield call(getAllClassApi, action.payload);

    yield put(
      getAllClassSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllClassFail(error?.message || 'Get all class failed!'));
  }
}

function* requestDeleteClassSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    yield call(requestDeleteClassApi, action.payload);
    yield put(deleteClassSuccess(action.payload));
    yield put(reGetAllClassRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(deleteClassFail(error?.message || 'Delete class failed!'));
  }
}

function* requestAddClassSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    const data = yield call(requestCreateClassApi, action.payload);
    yield put(addClassSuccess(data));
    yield put(reGetAllClassRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(addClassFail(error?.message || 'Add class failed!'));
  }
}

function* requestGetClassSaga(action) {
  try {
    const data = yield call(requestGetClassApi, action.payload);
    yield put(getClassSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getClassFail(error?.message || 'Get class info failed!'));
  }
}

function* requestUpdateClassSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateClassApi, action.payload);
    yield put(updateCoursesuccess(data));
    yield put(deleteClassSuccess({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(updateClassFail(error?.message || 'Update user info failed!'));
  }
}

export default function* watchClasses() {
  yield takeLatest(getAllClassRequest.type, requestAllClassesSaga);
  yield takeLatest(deleteClassRequest.type, requestDeleteClassSaga);
  yield takeLatest(addClassRequest.type, requestAddClassSaga);
  yield takeLatest(getClassRequest.type, requestGetClassSaga);
  yield takeLatest(updateClassRequest.type, requestUpdateClassSaga);

  yield takeLatest(
    [deleteClassSuccess.type, updateClassSuccess.type, addClassSuccess.type, deleteClassSuccess.type, getAllCourseRequest.type],
    requestAllClassesSaga
  );
}
