import axiosClient from './axiosClient';

const requestAddOrganizationApi = (params) => {
  return axiosClient.post('/notification', params);
};

export { requestAddOrganizationApi };
