import { useEffect, useMemo, useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTeacherStore } from '../../../hooks/teacher';
import { useClassesStore } from '../../../hooks/class';
import { useCourseStore } from '../../../hooks/course';
import { Selector } from '~/ui-component/atoms';

const AddClassModal = ({ open, setOpen }) => {
  const { teachersState, dispatchGetTeacherById, dispatchAddTeacher } = useTeacherStore();
  const { t } = useTranslation();
  const { classesState, dispatchAddClass } = useClassesStore();
  const { coursesState } = useCourseStore();

  const formik = useFormik({
    initialValues: {
      course: '',
      teacher: '',
      teaching_schedule: '',
      study_time: '',
      classroom: '',
      status: '',
      student_number: 0
    },
    validationSchema: yup.object({
      course: yup.string(),
      teacher: yup.string(),
      teaching_schedule: yup.string(),
      study_time: yup.string(),
      classroom: yup.string(),
      status: yup.string(),
      student_number: yup.number()
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddClass({
            course: values.course,
            teacher: values.teacher,
            teaching_schedule: values.teaching_schedule,
            study_time: values.study_time,
            classroom: values.classroom,
            status: values.status,
            student_number: values.student_number
          });

          handleCancel();
        }
      });
    },
    validateOnChange: true
  });
  const handleChangeCourse = useCallback(
    (value) => {
      console.log(value);
      formik.setFieldValue('course', value);
    },
    [formik]
  );
  const handleChangeteacher = useCallback(
    (value) => {
      console.log(value);
      formik.setFieldValue('teacher', value);
    },
    [formik]
  );

  const handleChangeStatus = useCallback(
    (value) => {
      console.log(value);
      formik.setFieldValue('status', value);
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
            options={coursesState?.course?.map((item) => {
              return {
                label: item?.course,
                value: item?.id
              };
            })}
            value={formik.values.course}
            onChange={handleChangeCourse}
            message={formik.touched.course ? formik.errors.course : ''}
            type={formik.touched.course && formik.errors.course ? 'error' : ''}
          />
          <Selector
            label={`Giáo viên dạy`}
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
            options={teachersState?.teacher?.map((item) => {
              return {
                label: item?.name,
                value: item?.id
              };
            })}
            value={formik.values.teacher}
            onChange={handleChangeteacher}
            message={formik.touched.teacher ? formik.errors.teacher : ''}
            type={formik.touched.teacher && formik.errors.teacher ? 'error' : ''}
          />

          <Input
            label={`Lịch dạy`}
            name="teaching_schedule"
            message={formik.touched.teaching_schedule ? formik.errors.teaching_schedule : ''}
            type={formik.touched.teaching_schedule && formik.errors.teaching_schedule ? 'error' : ''}
            value={formik.values.teaching_schedule}
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
            label={`Lịch học`}
            name="study_time"
            message={formik.touched.study_time ? formik.errors.study_time : ''}
            type={formik.touched.study_time && formik.errors.study_time ? 'error' : ''}
            value={formik.values.study_time}
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
            label={`Phòng học`}
            name="classroom"
            message={formik.touched.classroom ? formik.errors.classroom : ''}
            type={formik.touched.classroom && formik.errors.classroom ? 'error' : ''}
            value={formik.values.classroom}
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
            label={`Trạng thái lớp`}
            name="status"
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
              { label: 'Kết thúc', value: 'Kết thúc' },
              { label: 'Đang hoạt động', value: 'Đang hoạt động' },
              { label: 'Chờ khai giảng', value: 'Chờ khai giảng' }
            ]}
            value={formik.values.status}
            onChange={handleChangeStatus}
            message={formik.touched.status ? formik.errors.status : ''}
            type={formik.touched.status && formik.errors.status ? 'error' : ''}
          />
          {/* <Input
            label={`Trạng thái lớp`}
            name="status"
            message={formik.touched.status ? formik.errors.status : ''}
            type={formik.touched.status && formik.errors.status ? 'error' : ''}
            value={formik.values.status}
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
          <Input
            label={`Số học sinh`}
            name="student_number"
            message={formik.touched.student_number ? formik.errors.student_number : ''}
            type={formik.touched.student_number && formik.errors.student_number ? 'error' : ''}
            value={formik.values.student_number}
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
        </EditUserWrapper>
      </Modal>
    </>
  );
};

export default memo(AddClassModal);

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
