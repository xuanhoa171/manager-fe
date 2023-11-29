import axiosClient from './axiosClient';

const requestUpdateTimeSheetApi = (params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  console.log('api');
  return axiosClient.post(`/timesheet`, params);
};

export { requestUpdateTimeSheetApi };
