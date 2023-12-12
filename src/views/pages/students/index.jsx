import { memo, useCallback, useEffect, useState, useMemo } from 'react';
// project imports
import { AiOutlineUserAdd, AiFillEdit } from 'react-icons/ai';
import { TbTableExport } from 'react-icons/tb';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import AddStudentModal from './AddStudentModal';
import UpdateStudentModal from './UpdateStudentModal';
import { Popconfirm, Button } from 'antd';
import { useStudentStore } from '~/hooks/student';
import { useTranslation } from 'react-i18next';

const StudentPage = () => {
  const { t } = useTranslation();
  const { dispatchGetAllStudent, dispatchDeleteStudent, studentsState } = useStudentStore();
  console.log(studentsState);
  const [page, setPage] = useState(1);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const [openEditUserModal, setOpenEditUserModal] = useState({
    status: false,
    id: ''
  });

  const [openEditPasswordModal, setOpenEditPasswordModal] = useState({
    status: false,
    id: ''
  });

  useEffect(() => {
    dispatchGetAllStudent();
  }, [dispatchGetAllStudent]);

  useEffect(() => {
    setPage(studentsState.pagination.currentPage);
  }, [studentsState.pagination.currentPage]);

  const students = useMemo(() => {
    return studentsState.student;
  }, [studentsState.student]);

  const handleChangeEditUserModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditUserModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditUserModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditUserModal({
        status,
        id
      });
    }
  }, []);

  const handleChangeEditPasswordModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditPasswordModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditPasswordModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditPasswordModal({
        status,
        id
      });
    }
  }, []);

  const handleEdit = (params) => {
    handleChangeEditUserModal({
      status: true,
      id: params?.row?.id
    });
  };

  const handleDelete = (params) => {
    dispatchDeleteStudent({
      id: params?.id || ''
    });
    setPage(1);
  };

  // Ngoài những thuộc tính trong này, có thể xem thêm thuộc tính của columns table trong ~/ui-component/molecules/DataTable nha. Có giải thích rõ ràng ở đó
  const columns = [
    { field: 'name', headerName: t('table.user.name'), flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: t('table.user.email'), flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'phoneNumber', headerName: 'Số điện thoại', flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'birthday', headerName: 'Ngày sinh', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'address', headerName: 'Địa chỉ', flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'course', headerName: 'Khóa học', flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: t('table.user.actions'),
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <IconButton aria-label="delete">
              <MdDelete color="tomato" size={22} />
            </IconButton>
          </Popconfirm>
        </>
      ),
      flex: 2,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      dispatchGetAllStudent({ params: { page: value } });
      setPage(value);
    },
    [dispatchGetAllStudent]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            setOpenAddUserModal(true);
          }}
        >
          {t('pages.users.addUser')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.users.exportUserData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={students} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={studentsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <AddStudentModal open={openAddUserModal} setOpen={setOpenAddUserModal} />
      <UpdateStudentModal
        id={openEditUserModal.id}
        open={openEditUserModal.status}
        setOpen={handleChangeEditUserModal}
        handleChangeEditPasswordModal={handleChangeEditPasswordModal}
      />
    </MainCard>
  );
};

export default memo(StudentPage);

const ControlBar = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 16px;
  position: relative;
  justify-content: flex-end;
  display: flex;
  flex-direction: row;

  & > Button {
    margin: 0 8px;
  }
`;

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0 0 0;
`;
