import axiosClient from './axiosClient';
const getAllStudentsApi = () => {
  // get all
  return axiosClient.get('/students');
};

const requestCreateStudentApi = (params) => {
  // create
  console.log(params);
  return axiosClient.post('/students', params);
};
const requestDeleteStudentApi = (params) => {
  // xoa studnet
  const id = params?.id || '';
  return axiosClient.delete(`/students/${id}`);
};

const requestUpdateStudentApi = (params) => {
  //update
  const id = params?.id || '';
  console.log('params', params);
  return axiosClient.patch(`/students/${id}`, { address: params?.address, phoneNumber: params?.phoneNumber });
};

const requestGetStudentApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/students/${id}`);
};

export { getAllStudentsApi, requestCreateStudentApi, requestDeleteStudentApi, requestUpdateStudentApi, requestGetStudentApi };
