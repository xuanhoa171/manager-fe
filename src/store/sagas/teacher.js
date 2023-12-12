import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllTeachersApi,
  requestCreateTeacherApi,
  requestDeleteTeacherApi,
  requestUpdateTeacherApi,
  requestGetTeacherApi
} from '~/api/teacher';

import {
  getAllTeacherRequest,
  getAllTeachersuccess,
  getAllTeacherFail,
  deleteTeacherRequest,
  deleteTeachersuccess,
  deleteTeacherFail,
  addTeacherRequest,
  addTeachersuccess,
  addTeacherFail,
  getTeacherRequest,
  getTeachersuccess,
  getTeacherFail,
  updateTeacherRequest,
  updateTeachersuccess,
  updateTeacherFail,
  reGetAllTeacherRequest
} from '~/store/slices/rootAction';

function* requestAllTeachersSaga(action) {
  try {
    const data = yield call(getAllTeachersApi, action.payload);
    yield put(
      getAllTeachersuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllTeacherFail(error?.message || 'Get all users failed!'));
  }
}

function* requestDeleteTeachersSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    yield call(requestDeleteTeacherApi, action.payload);
    yield put(deleteTeachersuccess(action.payload));
    yield put(reGetAllTeacherRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(deleteTeacherFail(error?.message || 'Delete user failed!'));
  }
}

function* requestAddSTeachersSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    console.log('addd');
    const data = yield call(requestCreateTeacherApi, action.payload);

    yield put(addTeachersuccess(data));
    yield put(reGetAllTeacherRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(addTeacherFail(error?.message || 'Add user failed!'));
  }
}

function* requestGetTeachersSaga(action) {
  try {
    const data = yield call(requestGetTeacherApi, action.payload);
    console.log('datajkgjksgd');
    yield put(getTeachersuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getTeacherFail(error?.message || 'Get user info failed!'));
  }
}

function* requestUpdateTeachersSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateTeacherApi, action.payload);
    yield put(updateTeachersuccess(data));
    yield put(reGetAllTeacherRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(updateTeacherFail(error?.message || 'Update user info failed!'));
  }
}

export default function* watchTeacher() {
  yield takeLatest(getAllTeacherRequest.type, requestAllTeachersSaga);
  yield takeLatest(deleteTeacherRequest.type, requestDeleteTeachersSaga);
  yield takeLatest(addTeacherRequest.type, requestAddSTeachersSaga);
  yield takeLatest(getTeacherRequest.type, requestGetTeachersSaga);
  yield takeLatest(updateTeacherRequest.type, requestUpdateTeachersSaga);

  yield takeLatest([reGetAllTeacherRequest.type], requestAllTeachersSaga);
}
