import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllStudentsApi,
  requestCreateStudentApi,
  requestDeleteStudentApi,
  requestUpdateStudentApi,
  requestGetStudentApi
} from '~/api/student';

import {
  getAllStudentRequest,
  getAllstudentuccess,
  getAllStudentFail,
  deleteStudentRequest,
  deletestudentuccess,
  deletestudentFail,
  addStudentRequest,
  addstudentuccess,
  addStudentFail,
  getStudentRequest,
  getstudentuccess,
  getStudentFail,
  updateStudentRequest,
  updatestudentuccess,
  updateStudentFail,
  reGetAllStudentRequest
} from '~/store/slices/rootAction';

function* requestAllStudentSaga(action) {
  try {
    const data = yield call(getAllStudentsApi, action.payload);

    yield put(
      getAllstudentuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllStudentFail(error?.message || 'Get all users failed!'));
  }
}

function* requestDeleteStudentSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    yield call(requestDeleteStudentApi, action.payload);
    yield put(deletestudentuccess(action.payload));
    yield put(reGetAllStudentRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(deletestudentFail(error?.message || 'Delete user failed!'));
  }
}

function* requestAddStudentsSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestCreateStudentApi, action.payload);
    yield put(addstudentuccess(data));
    yield put(reGetAllStudentRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(addStudentFail(error?.message || 'Add user failed!'));
  }
}

function* requestGetStudentSaga(action) {
  try {
    const data = yield call(requestGetStudentApi, action.payload);
    console.log(data);
    yield put(getstudentuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(getStudentFail(error?.message || 'Get user info failed!'));
  }
}

function* requestUpdateStudentSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdateStudentApi, action.payload);
    yield put(updatestudentuccess(data));
    yield put(reGetAllStudentRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(updateStudentFail(error?.message || 'Update user info failed!'));
  }
}

export default function* watchStudent() {
  yield takeLatest(getAllStudentRequest.type, requestAllStudentSaga);
  yield takeLatest(deleteStudentRequest.type, requestDeleteStudentSaga);
  yield takeLatest(addStudentRequest.type, requestAddStudentsSaga);
  yield takeLatest(getStudentRequest.type, requestGetStudentSaga);
  yield takeLatest(updateStudentRequest.type, requestUpdateStudentSaga);

  yield takeLatest(
    [reGetAllStudentRequest.type, deleteStudentRequest.type, addStudentRequest.type, updateStudentRequest.type],
    requestAllStudentSaga
  );
}
