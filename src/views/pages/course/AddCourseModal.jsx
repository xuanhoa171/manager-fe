import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseStore } from '../../../hooks/course';
const AddCourseModal = ({ open, setOpen }) => {
  const { dispatchAddCourse } = useCourseStore();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      course: '',
      session: ''
      // phoneNumber: '',
      // birthday: '',
      // address: '',
      // password: '',
      // teachingschedule: ''
    },
    validationSchema: yup.object({
      course: yup.string().required('them ten khoa hoc'),
      session: yup.string().required('them thoi gian khoa hoc')
      // birthday: yup.string(),
      // address: yup.string(),
      // phoneNumber: yup.string(),
      // password: yup.string(),
      // teachingschedule: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddCourse({
            course: values.course,
            session: values.session
            // phoneNumber: values.phoneNumber,
            // birthday: values.birthday,
            // address: values.address,
            // password: values.password,
            // teachingschedule: values.teachingschedule
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
            label={`Tên khóa học`}
            name="course"
            message={formik.touched.course ? formik.errors.course : ''}
            type={formik.touched.course && formik.errors.course ? 'error' : ''}
            value={formik.values.course}
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
            label={`Thời gian khóa học`}
            name="session"
            message={formik.touched.session ? formik.errors.session : ''}
            type={formik.touched.session && formik.errors.session ? 'error' : ''}
            value={formik.values.session}
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
          {/* <Input
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
          /> */}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddCourseModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
