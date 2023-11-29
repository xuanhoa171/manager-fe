import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Selector } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { roles } from '~/store/constant';
import { useOrganizationsStore } from '~/hooks/organizations';
import { useUsersStore } from '~/hooks/users';
import { useAuthenticationStore } from '~/hooks/authentication';
import { useTranslation } from 'react-i18next';

const AddUserModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { organizationsState, dispatchGetAllOrganizations } = useOrganizationsStore();
  const { authenticationState } = useAuthenticationStore();
  const [newRoles, setNewRoles] = useState([]);
  const { dispatchAddUser } = useUsersStore();

  useEffect(() => {
    const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-2);
    // console.log('updateRoles', authenticationState.loginInfo.role, updateRoles);
    setNewRoles(updateRoles);
  }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      username: '',
      role: 'user',
      orgIds: []
    },
    validationSchema: yup.object({
      email: yup.string().email(t('input.error.user.invalidEmail')).required(t('input.error.user.pleaseEnterEmail')),
      password: yup
        .string()
        .min(5, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword')),
      name: yup.string().max(100, t('input.error.user.nameTooLong')).required(t('input.error.user.pleaseEnterUsername')),
      username: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.user.usernameNoSpecialChars'))
        .required(t('input.error.user.pleaseEnterUsername'))
        .test('no-spaces', t('input.error.user.usernameNoSpaces'), (value) => !/\s/.test(value)),
      role: yup.string().required(t('input.error.user.pleaseSelectUserRole')),
      orgIds: yup
        .array()
        .required(t('input.error.user.pleaseSelectOrganization'))
        .test('not-empty', t('input.error.user.pleaseSelectAtLeastOneOrganization'), (value) => value && value.length > 0)
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddUser({
            name: values.name,
            email: values.email,
            role: values.role,
            org_ids: values.orgIds,
            username: values.username,
            password: values.password
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

  const handleChangeRole = useCallback(
    (value) => {
      formik.setFieldValue('role', value);
    },
    [formik]
  );

  const handleChangeOrgIds = useCallback(
    (value) => {
      if (!Array.isArray(value)) value = [value];
      formik.setFieldValue('orgIds', value);
    },
    [formik]
  );

  const organizations = useMemo(() => {
    return (
      organizationsState.organizations.map((one) => ({
        label: one.fullname,
        value: one.id
      })) || []
    );
  }, [organizationsState.organizations]);

  useEffect(() => {
    dispatchGetAllOrganizations();
  }, [dispatchGetAllOrganizations]);

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
            label={`* ${t('input.label.user.username')}`}
            name="username"
            message={formik.touched.username ? formik.errors.username : ''}
            type={formik.touched.username && formik.errors.username ? 'error' : ''}
            value={formik.values.username}
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
            label={`* ${t('input.label.user.email')}`}
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
            label={`* ${t('input.label.user.password')}`}
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
            label={`* ${t('input.label.user.name')}`}
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
          <Selector
            label={`* ${t('input.label.user.organization')}`}
            name="orgIds"
            mode={formik.values.role === 'manager' || formik.values.role === 'admin' ? 'multiple' : ''}
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
            options={organizations}
            value={formik.values.orgIds}
            onChange={handleChangeOrgIds}
            message={formik.touched.orgIds ? formik.errors.orgIds : ''}
            type={formik.touched.orgIds && formik.errors.orgIds ? 'error' : ''}
          />
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddUserModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
