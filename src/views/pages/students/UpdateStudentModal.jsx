import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { roles } from '~/store/constant';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useTranslation } from 'react-i18next';
import { useStudentStore } from '~/hooks/student';
import { Selector } from '~/ui-component/atoms';
const UpdateStudentModal = ({ id, open, setOpen, handleChangeEditPasswordModal }) => {
  const { t } = useTranslation();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { dispatchGetStudentById, dispatchUpdateStudent, studentsState } = useStudentStore();

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-1);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      phoneNumber: '',
      birthday: '',
      address: '',
      course: ''
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
      name: yup.string().max(100, t('input.error.user.nameTooLong')).required(t('input.error.user.pleaseEnterUsername')),
      phoneNumber: yup.string().required(t('input.error.user.pleaseSelectUserRole')),
      birthday: yup.string().required(t('input.error.user.pleaseSelectUserRole')),
      address: yup.string().required(t('input.error.user.pleaseSelectUserRole')),
      course: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdateStudent({
            id,
            phoneNumber: values.phoneNumber,
            address: values.address
            // birthday: values.birthday
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

  useEffect(() => {
    if (id) {
      dispatchGetStudentById({ id });
    }
  }, [dispatchGetStudentById, id]);

  useEffect(() => {
    const data = studentsState.detail;
    if (data) {
      formik.setFieldValue('email', data.email || '');
      formik.setFieldValue('name', data.name || '');
      formik.setFieldValue('phoneNumber', data.phoneNumber || '');
      formik.setFieldValue('birthday', data.birthday || '');
      formik.setFieldValue('address', data.address || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentsState.detail]);

  const handleChangeRole = useCallback(
    (value) => {
      formik.setFieldValue('role', value);
    },
    [formik]
  );
  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title={t('modal.user.editUser')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText={t('modal.user.submitEditUser')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <Input
            label={`* ${t('input.label.user.email')}`}
            name="email"
            message={formik.touched.email ? formik.errors.email : ''}
            type={formik.touched.email && formik.errors.email ? 'error' : ''}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="middle"
            disabled
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
            label={`* ${t('input.label.user.name')}`}
            name="name"
            message={formik.touched.name ? formik.errors.name : ''}
            type={formik.touched.name && formik.errors.name ? 'error' : ''}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            disabled
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
          <Selector
            label={`* ${t('input.label.user.role')}`}
            name="role"
            mode=""
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
            options={newRoles}
            value={formik.values.role}
            onChange={handleChangeRole}
            message={formik.touched.role ? formik.errors.role : ''}
            type={formik.touched.role && formik.errors.role ? 'error' : ''}
          />
          {/* <EditLinkPassword onClick={handleOpenChangePassword}>{t('modal.user.updatePasswordBtn')}</EditLinkPassword> */}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(UpdateStudentModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;

const EditLinkPassword = styled.h4`
  cursor: pointer;

  &:hover {
    color: #f0432c;
  }
`;
