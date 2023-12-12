import axiosClient from './axiosClient';
const getAllTeachersApi = () => {
  // get all
  return axiosClient.get('/teachers');
};

const requestCreateTeacherApi = (params) => {
  // create
  console.log(params);
  return axiosClient.post('/teachers', params);
};
const requestDeleteTeacherApi = (params) => {
  // xoa studnet
  const id = params?.id || '';
  return axiosClient.delete(`/teachers/${id}`);
};

const requestUpdateTeacherApi = (params) => {
  //update
  const id = params?.id || '';
  console.log('params', params);
  return axiosClient.patch(`/teachers/${id}`, { address: params?.address, phoneNumber: params?.phoneNumber });
};

const requestGetTeacherApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/teachers/${id}`);
};

export { getAllTeachersApi, requestCreateTeacherApi, requestDeleteTeacherApi, requestUpdateTeacherApi, requestGetTeacherApi };
