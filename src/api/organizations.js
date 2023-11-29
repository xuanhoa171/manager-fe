import axiosClient from './axiosClient';
const getAllOrganizationsApi = (params) => {
  return axiosClient.get('/organizations', params);
};

const requestDeleteOrganizationsApi = (id) => {
  return axiosClient.delete(`/organizations/${id}`);
};

const requestAddOrganizationApi = (params) => {
  return axiosClient.post('/organizations', params);
};

const requestGetOrganizationApi = (params) => {
  return axiosClient.get(`/organizations/${params}`);
};

const requestUpdateOrganizationApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/organizations/${id}`, params);
};

export {
  getAllOrganizationsApi,
  requestDeleteOrganizationsApi,
  requestUpdateOrganizationApi,
  requestGetOrganizationApi,
  requestAddOrganizationApi
};
