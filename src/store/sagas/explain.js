import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestUpdateExplainApi,
  requestGetExplainApi,
  requestDeleteExplainApi,
  getExplainsApi
  // requestUpdateTimeSheetApi
  //   requestSearchExplainApi
} from '~/api/explain';
import {
  getAllExplainRequest,
  getAllExplainSuccess,
  getAllExplainFail,
  deleteExplainRequest,
  deleteExplainSuccess,
  deleteExplainFail,
  updateExplainRequest,
  updateExplainSuccess,
  updateExplainFail,
  getExplainRequest,
  getExplainSuccess,
  getExplainFail
  // updateTimesheetFailt,
  // updateTimesheetSuccess,
  // updateTimesheet
} from '~/store/slices/rootAction';

function* requestAllExplainsSaga(action) {
  try {
    const data = yield call(getExplainsApi, action.payload);
    yield put(
      getAllExplainSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllExplainFail(error?.message || 'Get all expplains failed!'));
  }
}

function* requestDeleteExplainSaga(action) {
  try {
    yield call(requestDeleteExplainApi, action.payload);
    yield put(deleteExplainSuccess(action.payload));
  } catch (error) {
    console.log('error', error);
    yield put(deleteExplainFail(error?.message || 'Delete explains failed!'));
  }
}

function* requestGetExplainSaga(action) {
  try {
    const data = yield call(requestGetExplainApi, action.payload);
    yield put(
      getExplainSuccess({
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
    yield put(getExplainFail(error?.message || 'Get explain info failed!'));
  }
}

function* requestUpdateExplainSaga(action) {
  try {
    const data = yield call(requestUpdateExplainApi, action.payload);
    yield put(updateExplainSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(updateExplainFail(error?.message || 'Update explain info failed!'));
  }
}

// function* requestUpdateTimeSheetSaga(action) {
//   try {
//     const data = yield call(requestUpdateTimeSheetApi, action.payload);
//     yield put(updateTimesheetSuccess(data));
//   } catch (error) {
//     console.log('error', error);
//     yield put(updateTimesheetFailt(error?.message || 'Update explain info failed!'));
//   }
// }

export default function* watchExplains() {
  yield takeLatest(getAllExplainRequest.type, requestAllExplainsSaga);
  yield takeLatest(getExplainRequest.type, requestGetExplainSaga);
  yield takeLatest(deleteExplainRequest.type, requestDeleteExplainSaga);
  yield takeLatest(updateExplainRequest.type, requestUpdateExplainSaga);
  // yield takeLatest(updateTimesheet.type, requestUpdateTimeSheetSaga);
  // Khi sua explain thành công hoặc xóa organization thành công thì đều gọi lại requestExplain để cập nhật lại list
  yield takeLatest([deleteExplainSuccess.type, updateExplainSuccess.type], requestAllExplainsSaga);
}
