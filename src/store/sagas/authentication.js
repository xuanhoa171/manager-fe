import { put, call, delay, takeLatest } from 'redux-saga/effects';
import { loginRequestApi, refreshTokenRequestApi } from '~/api/authentication';
import { initApp, loginRequest, loginSuccess, loginFail, refreshTokenSuccess, refreshTokenFail } from '~/store/slices/rootAction';
import dayjs from 'dayjs';

function* loginRequestSaga(action) {
  try {
    console.log('saga');
    const data = yield call(loginRequestApi, action.payload);
    const userRole = data.user.role;
    if (userRole == 'admin' || userRole == 'manager') {
      yield put(
        loginSuccess({
          accessToken: data.tokens?.access,
          refreshToken: data.tokens?.refresh,
          loginInfo: data.user
        })
      );
    } else {
      throw new Error('Bạn không có quyền truy cập vào trang quản trị');
    }
  } catch (error) {
    yield put(loginFail(error?.message || 'Login Failed!'));
  }
}

function* refreshTokenRequestSaga(action) {
  try {
    let { accessToken, refreshToken } = action.payload;

    const refreshTokenExpirationTime = dayjs(refreshToken?.expires);
    const accessTokenExpirationTime = dayjs(accessToken?.expires);
    const currentTime = dayjs();

    // Trong trường hợp refresh token hết hạn. throws luôn ra error:
    if (refreshTokenExpirationTime.isBefore(currentTime)) {
      throw new Error('Refresh token expired');
    }

    if (accessTokenExpirationTime.isAfter(currentTime)) {
      const diffInMillis = accessTokenExpirationTime.diff(currentTime);
      yield delay(diffInMillis);
    }

    const data = yield call(refreshTokenRequestApi, {
      refreshToken: refreshToken.token
    });

    yield put(
      refreshTokenSuccess({
        accessToken: data.access,
        refreshToken: data.refresh
      })
    );
  } catch (error) {
    yield put(refreshTokenFail(error?.message || 'Refresh Token Failed!'));
  }
}

export default function* watchAuthentication() {
  yield takeLatest(loginRequest.type, loginRequestSaga);
  yield takeLatest([initApp.type, loginSuccess.type, refreshTokenSuccess.type], refreshTokenRequestSaga);
}
