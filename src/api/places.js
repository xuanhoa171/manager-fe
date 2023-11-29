import axiosClient from './axiosClient';

const getAllPlacesApi = (params) => {
  return axiosClient.get('/places', params);
};

const requestGetPlaceApi = (params) => {
  const id = params?.id;
  return axiosClient.get(`/places/${id || ''}`);
};

const requestAddPlaceApi = (params) => {
  return axiosClient.post('/places', params);
};

const requestDeletePlaceApi = (params) => {
  const id = params?.id;
  return axiosClient.delete(`/places/${id || ''}`);
};

const requestUpdatePlaceApi = (params) => {
  const id = params['id'];
  if (!id) throw new Error('Id is required');

  delete params['id'];
  return axiosClient.put(`/places/${id}`, params);
};

export { getAllPlacesApi, requestGetPlaceApi, requestAddPlaceApi, requestDeletePlaceApi, requestUpdatePlaceApi };
