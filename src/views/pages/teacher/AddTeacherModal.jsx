import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTeacherStore } from '../../../hooks/teacher';
import { useCourseStore } from '../../../hooks/course';
import { Selector } from '~/ui-component/atoms';
const AddTeacherModal = ({ open, setOpen }) => {
  const { dispatchAddTeacher } = useTeacherStore();
  const { coursesState } = useCourseStore();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      birthday: '',
      address: '',
      password: '',
      teachingschedule: '',
      teachcourse: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')),
      name: yup.string().max(100, t('input.error.user.nameTooLong')),
      birthday: yup.string(),
      address: yup.string(),
      phoneNumber: yup.string(),
      password: yup.string(),
      teachingschedule: yup.string(),
      teachcourse: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddTeacher({
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            birthday: values.birthday,
            address: values.address,
            password: values.password,
            teachingschedule: values.teachingschedule,
            teachcourse: values.teachcourse
          });

          handleCancel();
        }
      });
    },
    validateOnChange: true
  });

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  const handleChangeCourse = useCallback(
    (value) => {
      formik.setFieldValue('teachcourse', value);
    },
    [formik]
  );
  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.user.addUser')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText={t('modal.user.submitAddUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <Input
            label={`Email`}
            name="email"
            message={formik.touched.email ? formik.errors.email : ''}
            type={formik.touched.email && formik.errors.email ? 'error' : ''}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="middle"
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
            label={`Số điện thoại`}
            name="phoneNumber"
            message={formik.touched.phoneNumber ? formik.errors.phoneNumber : ''}
            type={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'error' : ''}
            value={formik.values.phoneNumber}
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
            label={`Tên`}
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
            label={`Ngày sinh`}
            name="birthday"
            message={formik.touched.birthday ? formik.errors.birthday : ''}
            type={formik.touched.birthday && formik.errors.birthday ? 'error' : ''}
            value={formik.values.birthday}
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
            label={`Địa chỉ`}
            name="address"
            message={formik.touched.address ? formik.errors.address : ''}
            type={formik.touched.address && formik.errors.address ? 'error' : ''}
            value={formik.values.address}
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
            label={`Mật khẩu`}
            name="password"
            message={formik.touched.password ? formik.errors.password : ''}
            type={formik.touched.password && formik.errors.password ? 'error' : ''}
            value={formik.values.password}
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
            label={`Lịch dạy`}
            name="teachingschedule"
            message={formik.touched.teachingschedule ? formik.errors.teachingschedule : ''}
            type={formik.touched.teachingschedule && formik.errors.teachingschedule ? 'error' : ''}
            value={formik.values.teachingschedule}
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
          <Selector
            label={`Khóa học`}
            name="teachcourse"
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              height: '70px'
            }}
            selectStyle={{
              width: '100%'
            }}
            options={coursesState?.course?.map((item) => {
              return {
                label: item?.course,
                value: item?.id
              };
            })}
            value={formik.values.teachcourse}
            onChange={handleChangeCourse}
            message={formik.touched.teachcourse ? formik.errors.teachcourse : ''}
            type={formik.touched.teachcourse && formik.errors.teachcourse ? 'error' : ''}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddTeacherModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
