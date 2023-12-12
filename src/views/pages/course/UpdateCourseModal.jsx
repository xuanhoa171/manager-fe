import { useEffect } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCourseStore } from '../../../hooks/course';
const UpdateCourseModal = ({ id, open, setOpen }) => {
  const { t } = useTranslation();
  const { coursesState, dispatchGetCourseById, dispatchUpdateCourse } = useCourseStore();

  //   useEffect(() => {
  //     const updateRoles = authenticationState.loginInfo.role == 'admin' ? roles : roles.slice(-1);
  //     setNewRoles(updateRoles);
  //   }, [authenticationState.loginInfo.role, authenticationState.role]);

  const formik = useFormik({
    initialValues: {
      course: '',
      session: ''
      // phoneNumber: '',
      // birthday: '',
      // address: '',
      // teachingschedule: ''
      // //   password: '',
    },
    validationSchema: yup.object({
      course: yup.string().required('Vui lòng nhập tên khóa học'),
      session: yup.string().required('Vui lòng nhập thời gian khóa học')
      // phoneNumber: yup.string(),
      // birthday: yup.string(),
      // address: yup.string(),
      //   password: yup.string(),
      // teachingschedule: yup.string()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchUpdateCourse({
            id,
            course: values.course,
            sesion: values.sesion
            // teachingschedule: values.teachingschedule
            // password: values.password
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
      dispatchGetCourseById({ id });
    }
  }, [dispatchGetCourseById, id]);

  useEffect(() => {
    const data = coursesState.detail;
    if (data) {
      formik.setFieldValue('course', data.course || '');
      formik.setFieldValue('session', data.session || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesState.detail]);

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
          /> */}

          {/* <Input
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
          /> */}
          {/* <Input
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
          {/* <EditLinkPassword onClick={handleOpenChangePassword}>{t('modal.user.updatePasswordBtn')}</EditLinkPassword> */}
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(UpdateCourseModal);

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
