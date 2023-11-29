import IconButton from '@mui/material/IconButton';
import { Popconfirm } from 'antd';
import React, { useCallback, useMemo, memo } from 'react';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { useUsersStore } from '~/hooks/users';
import { DataTable } from '~/ui-component/molecules';
import { useTranslation } from 'react-i18next';

const TableUsers = ({ orgId, users }) => {
  const { t } = useTranslation();
  const { dispatchDeleteUser } = useUsersStore();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.role !== 'manager');
  }, [users]);

  const handleDelete = useCallback(
    (params) => {
      dispatchDeleteUser({
        id: params.id,
        params: {
          org_ids: orgId
        }
      });
    },
    [dispatchDeleteUser, orgId]
  );

  const columnsUser = [
    { field: 'username', headerName: t('table.user.username'), flex: 4, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: t('table.user.name'), flex: 4, align: 'center', headerAlign: 'center' },
    { field: 'role', headerName: t('table.user.role'), flex: 2, align: 'center', headerAlign: 'center' },
    {
      field: 'actions',
      headerName: t('table.user.actions'),
      renderCell: (params) => (
        <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
          <IconButton aria-label="delete" color="primary">
            <MdDelete color="tomato" size={22} />
          </IconButton>
        </Popconfirm>
      ),
      flex: 2,
      align: 'center',
      headerAlign: 'center'
    }
  ];

  return (
    <DataTableWrapper>
      <DataTable columns={columnsUser} rows={filteredUsers} checkboxSelection={false} density="compact" />
    </DataTableWrapper>
  );
};

export default memo(TableUsers);

const DataTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
