import styled from 'styled-components';
import { Input } from '~/ui-component/atoms';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const Information = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <InformationWrapper>
      <Input
        label={`* ${t('input.label.place.name')}`}
        name="name"
        message={formik.touched.name ? formik.errors.name : ''}
        type={formik.touched.name && formik.errors.name ? 'error' : ''}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        labelStyle={{
          padding: '2px'
        }}
        style={{
          width: '100%',
          marginTop: '8px',
          height: '70px'
        }}
        inputStyle={{
          width: '100%'
        }}
      />
      <Input
        label={`* ${t('input.label.place.r')}`}
        name="r"
        message={formik.touched.r ? formik.errors.r : ''}
        type={formik.touched.r && formik.errors.r ? 'error' : ''}
        value={formik.values.r}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        labelStyle={{
          padding: '2px'
        }}
        style={{
          width: '100%',
          height: '70px'
        }}
        inputStyle={{
          width: '100%'
        }}
      />
      <Input
        label={`* ${t('input.label.place.address')}`}
        name="address"
        message={formik.touched.address ? formik.errors.address : ''}
        type={formik.touched.address && formik.errors.address ? 'error' : ''}
        value={formik.values.address}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        size="middle"
        isTextArea={true}
        rows={1}
        labelStyle={{
          padding: '2px'
        }}
        style={{
          width: '100%'
        }}
        inputStyle={{
          width: '100%',
          resize: 'none'
        }}
        maxLength={300}
        showCount
      />
    </InformationWrapper>
  );
};

export default memo(Information);

const InformationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
