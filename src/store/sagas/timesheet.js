import { put, call, takeLatest } from 'redux-saga/effects';
import { requestUpdateTimeSheetApi } from '../../api/timesheet';
import { updateTimesheetFailt, updateTimesheetSuccess, updateTimesheetRequest } from '~/store/slices/rootAction';

function* requestUpdateTimeSheetSaga(action) {
  try {
    console.log('sagas');
    const data = yield call(requestUpdateTimeSheetApi, action.payload);
    yield put(updateTimesheetSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(updateTimesheetFailt(error?.message || 'Update explain info failed!'));
  }
}

export default function* watchTimesheet() {
  yield takeLatest(updateTimesheetRequest.type, requestUpdateTimeSheetSaga);
  // Khi sua explain thành công hoặc xóa organization thành công thì đều gọi lại requestExplain để cập nhật lại list
  //   yield takeLatest([updateTimesheetSuccess.type, updateExplainSuccess.type], requestAllExplainsSaga);
}
