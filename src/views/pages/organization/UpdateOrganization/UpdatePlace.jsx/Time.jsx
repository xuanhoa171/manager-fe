import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { TimePicker } from '~/ui-component/atoms';
import { useTranslation } from 'react-i18next';

const Time = ({ formik }) => {
  const { t } = useTranslation();

  const handleChangeTimeStart = useCallback(
    (value) => {
      formik.setFieldValue('timeStart', value);
    },
    [formik]
  );

  const handleChangeTimeEnd = useCallback(
    (value) => {
      formik.setFieldValue('timeEnd', value);
    },
    [formik]
  );

  return (
    <TimeWrapper>
      <TimePicker
        label={`* ${t('input.label.place.timeStart')}`}
        id="timeStart"
        name="timeStart"
        message={formik.touched.timeStart ? formik.errors.timeStart : ''}
        type={formik.touched.timeStart && formik.errors.timeStart ? 'error' : ''}
        value={formik.values.timeStart}
        onBlur={formik.handleBlur}
        onChange={handleChangeTimeStart}
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
      <TimePicker
        label={`* ${t('input.label.place.timeEnd')}`}
        id="timeEnd"
        name="timeEnd"
        message={formik.touched.timeEnd ? formik.errors.timeEnd : ''}
        type={formik.touched.timeEnd && formik.errors.timeEnd ? 'error' : ''}
        value={formik.values.timeEnd}
        onBlur={formik.handleBlur}
        onChange={handleChangeTimeEnd}
        size="middle"
        isTextArea={true}
        rows={4}
        labelStyle={{
          padding: '2px'
        }}
        style={{
          width: '100%',
          marginTop: '8px'
        }}
        inputStyle={{
          width: '100%'
        }}
      />
    </TimeWrapper>
  );
};

export default memo(Time);

const TimeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
