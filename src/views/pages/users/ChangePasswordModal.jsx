import { useFormik } from 'formik';
import { useCallback, useState, memo } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useUsersStore } from '~/hooks/users';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import { useTranslation } from 'react-i18next';

const ChangePasswordModal = ({ id, open, setOpen }) => {
  const { t } = useTranslation();
  const [errMess, setErrMess] = useState(false);

  const { dispatchUpdatePassword } = useUsersStore();

  const formik = useFormik({
    initialValues: {
      password: '',
      repassword: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword')),
      repassword: yup
        .string()
        .min(8, t('input.error.user.passwordMinLength'))
        .matches(/^(?=.*[a-z])(?=.*[0-9])/, t('input.error.user.passwordRequirements'))
        .required(t('input.error.user.pleaseEnterPassword'))
    }),
    onSubmit: (values) => {
      console.log('compare password', values);
      if (values.password !== values.repassword) {
        setErrMess(true);
        return;
      }
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdatePassword({
            id,
            password: values.password
          });
          setErrMess(false);
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
        title={t('modal.user.updatePassword')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText={t('modal.user.submitUpdatePassword')}
        cancelText={t('modal.user.cancel')}
      >
        <EditUserWrapper>
          <Input
            label={`* ${t('input.label.user.newPassword')}`}
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
            label={`* ${t('input.label.user.reTypeNewPassword')}`}
            name="repassword"
            message={formik.touched.repassword ? formik.errors.repassword : ''}
            type={formik.touched.repassword && formik.errors.repassword ? 'error' : ''}
            value={formik.values.repassword}
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
          {errMess && <EditLinkPassword>{t('input.error.user.passwordsDoNotMatch')}</EditLinkPassword>}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(ChangePasswordModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;

const EditLinkPassword = styled.h4`
  padding-top: 15px;
  color: #f0432c;
`;
