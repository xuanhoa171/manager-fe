import { memo } from 'react';
import { DataTable } from '~/ui-component/molecules';
// project imports
import MainCard from '~/ui-component/cards/MainCard';

const patrolRequestPage = () => {
  const columns = [
    { field: 'username', headerName: t('table.user.username'), flex: 2, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: t('table.user.name'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'email', headerName: t('table.user.email'), flex: 3, align: 'center', headerAlign: 'center' },
    { field: 'role', headerName: t('table.user.role'), flex: 2, align: 'center', headerAlign: 'center' }
  ];

  return (
    <MainCard>
      <DataTable columns={columns} />
    </MainCard>
  );
};

export default memo(patrolRequestPage);
