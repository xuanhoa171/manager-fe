import { useFormik } from 'formik';
import { useCallback, memo } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useOrganizationsStore } from '~/hooks/organizations';
import { Input } from '~/ui-component/atoms';
import { Modal } from '~/ui-component/molecules';
import { useTranslation } from 'react-i18next';

const AddOrganizationModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { dispatchAddOrganization } = useOrganizationsStore();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      name: '',
      code: ''
    },
    validationSchema: yup.object({
      fullname: yup
        .string()
        .max(100, t('input.error.organization.organizationNameTooLong'))
        .required(t('input.error.organization.pleaseEnterOrganizationName')),
      name: yup
        .string()
        .max(50, t('input.error.organization.abbreviatedNameTooLong'))
        .required(t('input.error.organization.pleaseEnterAbbreviatedName')),
      code: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, t('input.error.organization.specialCharactersNotAllowed'))
        .required(t('input.error.organization.pleaseEnterOrganizationCode'))
        .test('no-spaces', t('input.error.organization.spacesNotAllowed'), (value) => !/\s/.test(value))
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          console.log('values', values);

          dispatchAddOrganization({
            fullname: values.fullname,
            name: values.name,
            code: values.code
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
        title={t('modal.organization.addOrganization')}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText={t('modal.organization.submitAddOrganization')}
        cancelText={t('modal.organization.cancel')}
      >
        <AddOrganizationWrapper>
          <Input
            label={`* ${t('input.label.organization.fullname')}`}
            name="fullname"
            message={formik.touched.fullname ? formik.errors.fullname : ''}
            type={formik.touched.fullname && formik.errors.fullname ? 'error' : ''}
            value={formik.values.fullname}
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
            label={`* ${t('input.label.organization.name')}`}
            name="name"
            message={formik.touched.name ? formik.errors.name : ''}
            type={formik.touched.name && formik.errors.name ? 'error' : ''}
            value={formik.values.name}
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
            label={`* ${t('input.label.organization.code')}`}
            name="code"
            message={formik.touched.code ? formik.errors.code : ''}
            type={formik.touched.code && formik.errors.code ? 'error' : ''}
            value={formik.values.code}
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
        </AddOrganizationWrapper>
      </Modal>
    </>
  );
};

export default memo(AddOrganizationModal);

const AddOrganizationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
