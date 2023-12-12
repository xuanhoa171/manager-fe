import axiosClient from './axiosClient';
const getAllCoursesApi = () => {
  // get all
  return axiosClient.get('/courses');
};

const requestCreateCourseApi = (params) => {
  // create

  return axiosClient.post('/courses', params);
};
const requestDeleteCourseApi = (params) => {
  // xoa studnet
  const id = params?.id || '';
  return axiosClient.delete(`/courses/${id}`);
};

const requestUpdateCourseApi = (params) => {
  //update
  const id = params?.id || '';
  console.log('params', params);
  return axiosClient.patch(`/courses/${id}`, { course: params?.course, session: params?.session });
};

const requestGetCourseApi = (params) => {
  const id = params?.id || '';
  return axiosClient.get(`/courses/${id}`);
};

export { getAllCoursesApi, requestCreateCourseApi, requestDeleteCourseApi, requestUpdateCourseApi, requestGetCourseApi };
