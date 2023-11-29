import { call, put, takeLatest } from 'redux-saga/effects';

import { getAllPlacesApi, requestAddPlaceApi, requestDeletePlaceApi, requestGetPlaceApi, requestUpdatePlaceApi } from '~/api/places';

import {
  addPlaceFail,
  addPlaceRequest,
  addPlaceSuccess,
  deletePlaceFail,
  deletePlaceRequest,
  deletePlaceSuccess,
  getAllPlacesFail,
  getAllPlacesRequest,
  getAllPlacesSuccess,
  getPlaceFail,
  getPlaceRequest,
  getPlaceSuccess,
  updatePlaceFail,
  updatePlaceRequest,
  updatePlaceSuccess,
  reGetAllPlacesRequest
} from '~/store/slices/rootAction';

function* requestAllPlacesSaga(action) {
  try {
    const data = yield call(getAllPlacesApi, action.payload);

    yield put(
      getAllPlacesSuccess({
        page: data?.page,
        results: data?.results,
        totalPages: data?.totalPages
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getAllPlacesFail(error?.message || 'Get all places failed!'));
  }
}

function* requestAddPlaceSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    const data = yield call(requestAddPlaceApi, action.payload);
    yield put(addPlaceSuccess(data));
    yield put(reGetAllPlacesRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(addPlaceFail(error?.message || 'Add place failed!'));
  }
}

function* requestDeletePlaceSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }
    yield call(requestDeletePlaceApi, action.payload);
    yield put(deletePlaceSuccess(action.payload));
    yield put(reGetAllPlacesRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(deletePlaceFail(error?.message || 'Delete place failed!'));
  }
}

function* requestGetPlaceSaga(action) {
  try {
    const data = yield call(requestGetPlaceApi, action.payload);
    yield put(
      getPlaceSuccess({
        minimumTime: data.minimumTime,
        status: data.status,
        lat: data.lat,
        long: data.long,
        orgId: data.org_id,
        r: data.r,
        address: data.address,
        name: data.name,
        time: data.time,
        id: data.id,
        wifi: data.wifi,
        wifiName: data.wifi_name,
        mac: data.mac,
        timeStart: data.time_start,
        timeEnd: data.time_end,
        ipAddress: data.ip_address,
        macAddress: data.mac_address
      })
    );
  } catch (error) {
    console.log('error', error);
    yield put(getPlaceFail(error?.message || 'Get place info failed!'));
  }
}

function* requestUpdatePlaceSaga(action) {
  try {
    const params = action.payload?.params;
    if (params) {
      delete action.payload.params;
    }

    const data = yield call(requestUpdatePlaceApi, action.payload);
    yield put(updatePlaceSuccess(data));
    yield put(reGetAllPlacesRequest({ params }));
  } catch (error) {
    console.log('error', error);
    yield put(updatePlaceFail(error?.message || 'Update place info failed!'));
  }
}

export default function* watchPlaces() {
  yield takeLatest(getAllPlacesRequest.type, requestAllPlacesSaga);
  yield takeLatest(deletePlaceRequest.type, requestDeletePlaceSaga);
  yield takeLatest(addPlaceRequest.type, requestAddPlaceSaga);
  yield takeLatest(getPlaceRequest.type, requestGetPlaceSaga);
  yield takeLatest(updatePlaceRequest.type, requestUpdatePlaceSaga);

  yield takeLatest([reGetAllPlacesRequest.type], requestAllPlacesSaga);
}
