import { Card, Space, Switch } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Input } from '~/ui-component/atoms';

const Setting = ({ formik }) => {
  const { t } = useTranslation();

  const handleChangeWifi = useCallback(
    (status) => {
      formik.setFieldValue('wifi', status);
    },
    [formik]
  );

  const handleChangeMac = useCallback(
    (status) => {
      formik.setFieldValue('mac', status);
    },
    [formik]
  );

  return (
    <CustomSpace direction="vertical" style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden', flexDirection: 'row' }}>
      <CustomCard title={t('modal.place.checkWifi')} size="small">
        <Switch
          name="wifi"
          checked={formik.values.wifi}
          checkedChildren={t('global.enable')}
          unCheckedChildren={t('global.disable')}
          onChange={handleChangeWifi}
        />
        <Input
          label={`${t('input.label.place.wifiName')}`}
          name="wifiName"
          message={formik.touched.wifiName ? formik.errors.wifiName : ''}
          type={formik.touched.wifiName && formik.errors.wifiName ? 'error' : ''}
          value={formik.values.wifiName}
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
          placeholder="XXX.XXX.XXX.XXX"
          disabled={!formik.values.wifi}
        />
        <Input
          label={`${t('input.label.place.ipAddress')}`}
          name="ipAddress"
          message={formik.touched.ipAddress ? formik.errors.ipAddress : ''}
          type={formik.touched.ipAddress && formik.errors.ipAddress ? 'error' : ''}
          value={formik.values.ipAddress}
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
          placeholder="XX-XX-XX-XX-XX-XX"
          disabled={!formik.values.wifi}
        />
      </CustomCard>
      <CustomCard title={t('modal.place.checkMAC')} size="small">
        <Switch
          name="mac"
          checked={formik.values.mac}
          checkedChildren={t('global.enable')}
          unCheckedChildren={t('global.disable')}
          onChange={handleChangeMac}
        />
        <Input
          label={`${t('input.label.place.macAddress')}`}
          name="macAddress"
          message={formik.touched.macAddress ? formik.errors.macAddress : ''}
          type={formik.touched.macAddress && formik.errors.macAddress ? 'error' : ''}
          value={formik.values.macAddress}
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
          disabled={!formik.values.mac}
        />
      </CustomCard>
    </CustomSpace>
  );
};

export default memo(Setting);

const CustomCard = styled(Card)`
  width: 100%;
  height: 100%;
`;

const CustomSpace = styled(Space)`
  & > * {
    width: 100%;
    height: 100%;
  }
`;
