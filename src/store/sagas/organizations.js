import { put, call, takeLatest } from 'redux-saga/effects';
import {
  getAllOrganizationsApi,
  requestDeleteOrganizationsApi,
  requestUpdateOrganizationApi,
  requestGetOrganizationApi,
  requestAddOrganizationApi
} from '~/api/organizations';
import {
  getAllOrganizationRequest,
  getAllOrganizationSuccess,
  getAllOrganizationFail,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFail,
  updateOrganizationRequest,
  updateOrganizationSuccess,
  updateOrganizationFail,
  getOrganizationRequest,
  getOrganizationSuccess,
  getOrganizationFail,
  addOrganizationRequest,
  addOrganizationSuccess,
  addOrganizationFail
} from '~/store/slices/rootAction';

function* requestAllOrganizationsSaga(action) {
  try {
    const data = yield call(getAllOrganizationsApi, action.payload);
    console.log('requestAllOrganizationsSaga', data);

    yield put(
      getAllOrganizationSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllOrganizationFail(error?.message || 'Get all organizations failed!'));
  }
}

function* requestDeleteOrganizationSaga(action) {
  try {
    yield call(requestDeleteOrganizationsApi, action.payload);
    yield put(deleteOrganizationSuccess(action.payload));
  } catch (error) {
    console.log('error', error);
    yield put(deleteOrganizationFail(error?.message || 'Delete organizations failed!'));
  }
}

function* requestGetOrganizationSaga(action) {
  try {
    const data = yield call(requestGetOrganizationApi, action.payload);
    yield put(
      getOrganizationSuccess({
        place: data.place,
        code: data.code,
        name: data.name,
        fullname: data.fullname,
        leader: data.leader,
        id: data.id
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getOrganizationFail(error?.message || 'Get organization info failed!'));
  }
}

function* requestUpdateOrganizationSaga(action) {
  try {
    const data = yield call(requestUpdateOrganizationApi, action.payload);
    yield put(updateOrganizationSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(updateOrganizationFail(error?.message || 'Update organization info failed!'));
  }
}

function* requestAddOrganizationSaga(action) {
  try {
    const data = yield call(requestAddOrganizationApi, action.payload);
    yield put(addOrganizationSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(addOrganizationFail(error?.message || 'Add organization failed!'));
  }
}

export default function* watchOrganizations() {
  yield takeLatest(getAllOrganizationRequest.type, requestAllOrganizationsSaga);
  yield takeLatest(getOrganizationRequest.type, requestGetOrganizationSaga);
  yield takeLatest(deleteOrganizationRequest.type, requestDeleteOrganizationSaga);
  yield takeLatest(updateOrganizationRequest.type, requestUpdateOrganizationSaga);
  yield takeLatest(addOrganizationRequest.type, requestAddOrganizationSaga);

  // Khi thêm organization thành công hoặc xóa organization thành công thì đều gọi lại requestAllOrganizations để cập nhật lại list
  yield takeLatest(
    [deleteOrganizationSuccess.type, updateOrganizationSuccess.type, addOrganizationSuccess.type],
    requestAllOrganizationsSaga
  );
}
