import { memo, useCallback, useState } from 'react';
// project imports
import MainCard from '~/ui-component/cards/MainCard';
import axiosClient from '../../../api/axiosClient';
const requestUpdateUserApi = (id, params) => {
  return axiosClient.put(`/users/${id}`, params);
};
const ForgotCheckoutReportPage = () => {
  const [file, setFile] = useState();
  const onChangeImage = useCallback(async (e) => {
    const form = new FormData();
    form.append('image', e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    const response = await requestUpdateUserApi('64c5bc3a9b1f322e1c4831c4', URL.createObjectURL(e.target.files[0]));
    console.log(response);
  }, []);
  return (
    <MainCard>
      <input type="file" placeholder="pick image" onChangeCapture={onChangeImage} />
      <img src={file} alt="" width={100} height={100} style={{ borderRadius: 50 }} />
    </MainCard>
  );
};

export default memo(ForgotCheckoutReportPage);
