import axiosClient from './axiosClient';
const getAllClassApi = () => {
  // get all
  return axiosClient.get('/classes');
};

const requestCreateClassApi = (params) => {
  return axiosClient.post('/classes', params);
};
const requestDeleteClassApi = (params) => {
  // xoa studnet
  const id = params?.id || '';
  return axiosClient.delete(`/classes/${id}`);
};

const requestUpdateClassApi = (params) => {
  //update
  const id = params?.id || '';
  return axiosClient.patch(`/classes/${id}`, {
    status: params.status,
    student_number: params.student_number,
    teacher: params.teacher,
    classroom: params.classroom,
    study_time: params.study_time,
    course: params.course
  });
};

const requestGetClassApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/classes/${id}`);
};

export { getAllClassApi, requestCreateClassApi, requestDeleteClassApi, requestUpdateClassApi, requestGetClassApi };
