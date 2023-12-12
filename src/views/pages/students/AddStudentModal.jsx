import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Selector } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStudentStore } from '~/hooks/student';

const AddStudentModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchGetAllStudent, dispatchDeleteStudent, dispatchAddStudent, dispatchGetStudentById, dispatchUpdateStudent, studentsState } =
    useStudentStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: undefined,
      birthday: '',
      address: '',
      course: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')),
      name: yup.string().max(100, t('input.error.user.nameTooLong')),
      birthday: yup.string(),
      address: yup.string(),
      phoneNumber: yup.string(),
      course: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddStudent({
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            birthday: values.birthday,
            address: values.address,
            course: values.course
          });

          handleCancel();
        }
      });
    },
    validateOnChange: true
  });
  // const handleChangeTimeEnd = useCallback(
  //   (value) => {
  //     formik.setFieldValue('birthday', value);
  //   },
  //   [formik]
  // );

  const handleChangeRole = useCallback(
    (value) => {
      formik.setFieldValue('course', value);
    },
    [formik]
  );
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
          {/* <TimePicker
            label={`Ngày sinh`}
            // id="timeEnd"
            name="birthday"
            message={formik.touched.birthday ? formik.errors.birthday : ''}
            type={formik.touched.birthday && formik.errors.birthday ? 'error' : ''}
            value={formik.values.birthday}
            onBlur={formik.handleBlur}
            onChange={handleChangeTimeEnd}
            size="middle"
            // isTextArea={true}
            // rows={4}
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
          /> */}
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
          <Selector
            label={`Khóa học`}
            name="course"
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
            options={[
              {
                label: 'Khóa học 1',
                value: 'admin'
              },
              {
                label: 'Khóa học 2',
                value: 'teacher'
              },
              {
                label: 'KHóa học 3',
                value: 'user'
              }
            ]}
            value={formik.values.course}
            onChange={handleChangeRole}
            message={formik.touched.course ? formik.errors.course : ''}
            type={formik.touched.course && formik.errors.course ? 'error' : ''}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddStudentModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
  z-index: -1;
`;
