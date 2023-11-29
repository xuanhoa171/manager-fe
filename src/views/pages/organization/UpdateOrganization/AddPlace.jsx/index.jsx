import React, { memo, useCallback } from 'react';
import { Modal } from '~/ui-component/molecules';
import styled from 'styled-components';
import SelectPosition from './SelectPosition';
import Information from './Information';
import Setting from './Setting';
import Time from './Time';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from '~/handlers/toast';
import checkValidIp from '~/handlers/checkValidIp';
import checkValidMac from '~/handlers/checkValidMac';
import { usePlacesStore } from '~/hooks/places';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const AddPlace = ({ orgId, open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddPlace } = usePlacesStore();

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      lat: '',
      long: '',
      r: 300,
      timeStart: '',
      timeEnd: '',
      wifi: false,
      wifiName: '',
      ipAddress: '',
      mac: false,
      macAddress: ''
    },
    validationSchema: yup.object({
      name: yup.string().max(200, t('input.error.place.placeNameTooLong')).required(t('input.error.place.pleaseEnterPlaceName')),
      address: yup.string().max(300, t('input.error.place.addressTooLong')).required(t('input.error.place.pleaseEnterAddress')),
      lat: yup.string(),
      long: yup.string(),
      r: yup.number().required(t('input.error.place.pleaseEnterRadius')),
      timeStart: yup.date().required(t('input.error.place.pleaseSelectStartTime')),
      timeEnd: yup.date().required(t('input.error.place.pleaseSelectEndTime')),
      wifi: yup.boolean(),
      wifiName: yup.string().when('wifi', {
        is: true,
        then: yup.string().required(t('input.error.place.pleaseEnterWifiName'))
      }),
      mac: yup.boolean(),
      ipAddress: yup
        .string()
        .test('ipAddress', t('input.error.place.invalidIPAddress'), (value) => {
          if (value && !checkValidIp(value)) {
            return false;
          }
          return true;
        })
        .when('wifi', {
          is: true,
          then: yup.string().required(t('input.error.place.pleaseEnterIPAddress'))
        }),
      macAddress: yup
        .string()
        .test('ipAddremacAddressss', t('input.error.place.invalidMACAddress'), (value) => {
          if (value && !checkValidMac(value)) {
            return false;
          }
          return true;
        })
        .when('mac', {
          is: true,
          then: yup.string().required(t('input.error.place.pleaseEnterMacAddress'))
        })
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          try {
            // additional validation
            if (!values.lat) {
              throw new Error(t('input.error.place.pleaseEnterLatitude'));
            }

            if (!values.long) {
              throw new Error(t('input.error.place.pleaseEnterLongitude'));
            }

            dispatchAddPlace({
              lat: values.lat,
              long: values.long,
              org_id: orgId,
              r: values.r,
              address: values.address,
              name: values.name,
              time_start: dayjs(values.timeStart).unix(),
              time_end: dayjs(values.timeEnd).unix(),
              wifi: values.wifi,
              wifi_name: values.wifiName,
              ip_address: values.ipAddress !== '...' ? values.ipAddress : '',
              mac: values.mac,
              mac_address: values.macAddress !== '-----' ? values.macAddress : '',
              params: {
                org_id: orgId
              }
            });

            handleCancel();
          } catch (exception) {
            if (exception?.message) {
              toast('warning', exception.message);
            }
          }
        } else {
          console.log(formik.errors);
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title={t('modal.place.addPlace')}
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
      width="95%"
      okText={t('modal.place.submitAddPlace')}
      cancelText={t('modal.place.cancel')}
    >
      <Wrapper>
        <Cell>
          <TitleCell>{t('modal.place.placeInformation')}</TitleCell>
          <Information formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>{t('modal.place.selectPlacePosition')}</TitleCell>
          <SelectPosition formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>{t('modal.place.configTime')}</TitleCell>
          <Time formik={formik} />
        </Cell>
        <Cell>
          <TitleCell>{t('modal.place.settingPlace')}</TitleCell>
          <Setting formik={formik} />
        </Cell>
      </Wrapper>
    </Modal>
  );
};

export default memo(AddPlace);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1.1fr 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1.8fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const Cell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f1f6f9;
  border-radius: 8px;
  padding: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TitleCell = styled.div`
  font-weight: 600;
`;
