import { put, call, takeLatest } from 'redux-saga/effects';
import { requestAddOrganizationApi } from '../../api/notification';
import { addNotificationFailt, addNotificationSuccess, addNotificationRequest } from '~/store/slices/rootAction';
//addNotificationSuccess, addNotificationFailt, addNotificationRequest
function* requestAddNotificationSaga(action) {
  try {
    console.log('sagas');
    const data = yield call(requestAddOrganizationApi, action.payload);
    yield put(addNotificationSuccess(data));
  } catch (error) {
    console.log('error', error);
    yield put(addNotificationFailt(error?.message || 'Update explain info failed!'));
  }
}

export default function* watchNotification() {
  yield takeLatest(addNotificationRequest.type, requestAddNotificationSaga);
  // Khi sua explain thành công hoặc xóa organization thành công thì đều gọi lại requestExplain để cập nhật lại list
  //   yield takeLatest([updateTimesheetSuccess.type, updateExplainSuccess.type], requestAllExplainsSaga);
}
