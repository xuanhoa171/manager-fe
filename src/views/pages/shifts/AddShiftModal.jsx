import { useState } from 'react';
import { Modal } from '~/ui-component/molecules';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, TimePicker, TimeLate, RangePicker } from '~/ui-component/atoms';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useShiftsStore } from '~/hooks/shifts';

const AddShiftModal = ({ open, setOpen }) => {
  const { dispatchAddShift } = useShiftsStore();
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [timeLate, setTimeLate] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      time_start_end: 'testing',
      from_to_date: 'testing',
      code: '',
      max_time_late: 1,
      description: ''
    },
    validationSchema: yup.object({
      name: yup.string().max(100, 'Tên của bạn quá dài').required('Vui lòng nhập tên ca làm'),
      time_start_end: yup.string().required('Vui lòng nhập thời gian bắt đầu và kết thúc ca làm'),
      from_to_date: yup.string().required('Vui lòng nhập thời gian check in'),
      code: yup
        .string()
        .max(10, 'Đoạn code của bạn quá dài')
        .matches(/^[a-zA-Z0-9_]+$/, 'Đoạn mã không được chứa ký tự đặc biệt')
        .required('Vui lòng nhập mã ca trực')
        .test('no-spaces', 'Đoạn mã không được chứa dấu cách', (value) => !/\s/.test(value)),
      max_time_late: yup.number().required('Vui lòng nhập thời gian muộn cho phép'),
      description: yup.string().max(100, 'Mô tả của bạn quá dài').required('Vui lòng nhập mô tả ca làm')
    }),
    onSubmit: (values) => {
      formik.validateForm().then(() => {
        if (formik.isValid) {
          dispatchAddShift({
            name: values.name,
            time_start: timeStart,
            time_end: timeEnd,
            from_date: fromDate,
            to_date: toDate,
            code: values.code,
            max_time_late: timeLate,
            description: values.description
          });

          setTimeStart(null);
          setTimeEnd(null);
          setFromDate(null);
          setToDate(null);
          setTimeLate(null);

          handleCancel();
        }
      });
    },
    validateOnChange: true
  });

  const handleTimeLatePicker = (timeLate) => {
    console.log('timeLate', typeof Number(timeLate.target.value));
    setTimeLate(Number(timeLate.target.value));
  };

  const handleDatePicker = (dateRange) => {
    formatDate(dateRange);
  };

  const handleCancel = useCallback(() => {
    formik.handleReset();
    setOpen(false);
  }, [formik, setOpen]);

  const handleRangeChange = (timeRange) => {
    formatTime(timeRange);
  };

  const formatTime = (selectedRange) => {
    if (selectedRange) {
      setTimeStart(selectedRange[0].unix());
      setTimeEnd(selectedRange[1].unix());
    } else {
      console.log('No range selected');
    }
  };

  const formatDate = (timeRange) => {
    if (timeRange && timeRange.length === 2) {
      const [startTime, endTime] = timeRange;
      setFromDate(startTime.format('YYYY/MM/DD'));
      setToDate(endTime.format('YYYY/MM/DD'));
    } else {
      console.log('No range selected');
    }
  };

  return (
    <>
      <Modal
        open={open}
        onOpen={setOpen}
        title="Thêm ca làm việc"
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        width="350px"
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <EditUserWrapper>
          <Input
            label="* Tên ca làm"
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
            label="* Mã ca làm"
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
          <Input
            label="* Mô tả"
            name="description"
            message={formik.touched.description ? formik.errors.description : ''}
            type={formik.touched.description && formik.errors.description ? 'error' : ''}
            value={formik.values.description}
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
          <TimeLate
            label="* Thời gian muộn cho phép"
            name="max_time_late"
            message={formik.touched.max_time_late ? formik.errors.max_time_late : ''}
            type={formik.touched.max_time_late && formik.errors.max_time_late ? 'error' : ''}
            value={formik.values.max_time_late}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleTimeLatePicker(e);
            }}
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              height: '70px',
              zIndex: 9999
            }}
            inputStyle={{
              width: '100%',
              zIndex: 20
            }}
          />
          <TimePicker
            label="* Giờ ca làm"
            name="time_start_end"
            message={formik.touched.time_start_end ? formik.errors.time_start_end : ''}
            type={formik.touched.time_start_end && formik.errors.time_start_end ? 'error' : ''}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleRangeChange(e);
            }}
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              height: '70px',
              zIndex: 9999
            }}
            inputStyle={{
              width: '100%'
            }}
          />
          <RangePicker
            label="* Ngày trực"
            name="from_to_date"
            message={formik.touched.from_to_date ? formik.errors.from_to_date : ''}
            type={formik.touched.from_to_date && formik.errors.from_to_date ? 'error' : ''}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              handleDatePicker(e);
            }}
            labelStyle={{
              padding: '2px'
            }}
            style={{
              width: '100%',
              marginTop: '8px',
              height: '70px',
              zIndex: 20
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

export default AddShiftModal;

const EditUserWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 0;
`;
