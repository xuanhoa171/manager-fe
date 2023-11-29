import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useOrganizationsStore } from '~/hooks/organizations';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import AddOrganization from './AddOrganization';
import UpdateOrganization from './UpdateOrganization';

const OrganizationPage = () => {
  const { t } = useTranslation();
  const { organizationsState, dispatchGetAllOrganizations, dispatchDeleteOrganization } = useOrganizationsStore();
  const [page, setPage] = useState(1);
  const [openAddOrganizationModal, setOpenAddOrganizationModal] = useState(false);
  const [openEditOrganizationModal, setOpenEditOrganizationModal] = useState({
    status: false,
    id: ''
  });
  useEffect(() => {
    dispatchGetAllOrganizations();
  }, [dispatchGetAllOrganizations]);

  const Organizations = useMemo(() => {
    return organizationsState.organizations;
  }, [organizationsState.organizations]);

  const handleDelete = (params) => {
    dispatchDeleteOrganization(params.id);
  };
  const handleChangeEditOrganizationModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditOrganizationModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditOrganizationModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditOrganizationModal({
        status,
        id
      });
    }
  }, []);

  const handleEditOrganization = (params) => {
    handleChangeEditOrganizationModal({
      status: true,
      id: params?.row?.id
    });
  };

  const columns = [
    { field: 'id', headerName: t('table.organization.id'), flex: 2 },
    {
      field: 'leader',
      headerName: t('table.organization.leader'),
      flex: 2,
      valueGetter: (params) => params?.row?.leader?.name
    },
    { field: 'fullname', headerName: t('table.organization.fullname'), flex: 2 },
    { field: 'name', headerName: t('table.organization.name'), flex: 1 },
    { field: 'code', headerName: t('table.organization.code'), flex: 1 },
    {
      field: 'actions',
      headerName: t('table.organization.actions'),
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleEditOrganization(params)}>
            <AiFillEdit size={22} />
          </IconButton>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <Button type="text" danger>
              <MdDelete color="tomato" size={22} />
            </Button>
          </Popconfirm>
        </>
      ),
      flex: 2
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      console.log('setPage', value);
      setPage(value);
      dispatchGetAllOrganizations({ params: { page: value } });
    },
    [dispatchGetAllOrganizations]
  );

  return (
    <MainCard>
      <ControlBar>
        <Button
          type="primary"
          icon={<BsFillBuildingsFill />}
          onClick={() => {
            setOpenAddOrganizationModal(true);
          }}
        >
          {t('pages.organization.addOrganization')}
        </Button>
        <Button type="primary" icon={<TbTableExport />}>
          {t('pages.organization.exportOrganizationData')}
        </Button>
      </ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={Organizations} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={organizationsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
      <AddOrganization open={openAddOrganizationModal} setOpen={setOpenAddOrganizationModal} />
      <UpdateOrganization
        id={openEditOrganizationModal.id}
        open={openEditOrganizationModal.status}
        setOpen={handleChangeEditOrganizationModal}
      />
    </MainCard>
  );
};

export default memo(OrganizationPage);

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
