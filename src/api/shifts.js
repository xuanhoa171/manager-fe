import axiosClient from './axiosClient';
const getAllShiftsApi = (params) => {
  return axiosClient.get('/shift', params);
};
const requestDeleteShiftApi = (id) => {
  return axiosClient.delete(`/shift/${id}`);
};

const requestAddShiftApi = (params) => {
  return axiosClient.post('/shift', params);
};

export { getAllShiftsApi, requestDeleteShiftApi, requestAddShiftApi };
