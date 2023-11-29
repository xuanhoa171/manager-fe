import axiosClient from './axiosClient';
const getAllUsersApi = (params) => {
  return axiosClient.get('/users', params);
};

const requestDeleteUserApi = (params) => {
  const id = params?.id || '';
  return axiosClient.delete(`/users/${id}`);
};

const requestAddUserApi = (params) => {
  return axiosClient.post('/users', params);
};

const requestGetUserApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/users/${id}`);
};

const requestUpdateUserApi = (params) => {
  console.log('parms', params);
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/${id}`, params);
};

const requestUpdatePasswordApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/users/change-password/${id}`, params);
};

export { getAllUsersApi, requestDeleteUserApi, requestAddUserApi, requestGetUserApi, requestUpdateUserApi, requestUpdatePasswordApi };
