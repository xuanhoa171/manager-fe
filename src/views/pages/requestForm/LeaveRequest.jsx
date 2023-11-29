import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// project imports
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
// import { BsFillBuildingsFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
// import { TbTableExport } from 'react-icons/tb';
import styled from 'styled-components';
import { useExplainsStore } from '../../../hooks/explain';
import { useTimesheetStore } from '../../../hooks/timesheet';
import { useNotificationStore } from '../../../hooks/notification';
import { useAuthenticationStore } from '../../../hooks/authentication';
import MainCard from '~/ui-component/cards/MainCard';
import { DataTable } from '~/ui-component/molecules';
import dispatchToast from '../../../handlers/toast';
import dayjs from 'dayjs';

const formatExplains = (results) => {
  let response = [];
  results.map((item) => {
    let active = item['active'] === true ? 'Đã duyệt' : 'Chưa duyệt';
    let status = item['status'] === 'in' ? 'Chấm vào' : 'Chấm ra';
    response.push({ ...item, active, status });
  });
  return response;
};

const LeaveRequestPage = () => {
  const { t } = useTranslation();
  const { explainsState, dispatchGetAllExplains, dispatchDeleteExplain, dispatchUpdateExplain } = useExplainsStore();
  const { dispatchAddNofitication } = useNotificationStore();
  const { dispatchUpdateTimeSheet } = useTimesheetStore();
  const { authenticationState } = useAuthenticationStore();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatchGetAllExplains({
      org_id: authenticationState.loginInfo['org_ids'][0],
      page: page,
      limit: 10
    });
  }, [authenticationState.loginInfo, dispatchGetAllExplains, page, loading]);

  const Explains = useMemo(() => {
    return formatExplains(explainsState.explain);
  }, [explainsState.explain]);

  const handleDelete = (params) => {
    dispatchDeleteExplain(params['row']['id']);
  };

  const handleChangeEditExplainModal = useCallback(
    (id, params) => {
      if (params['row']['active'] === 'Đã duyệt') {
        dispatchToast('warning', 'Đã duyệt đơn này');
      } else {
        const dataPost = {
          name: `Bắt đầu chấm công tại ${params.row['place_name']}`,
          lat: params.row['lat'], //
          long: params.row['long'], //
          target: params.row['id_place'],
          status: 'in',
          datetime: new Date(params.row['date_explain']).getTime(),
          address: params.row['place_name']
        };
        dispatchUpdateTimeSheet(dataPost);
        dispatchUpdateExplain({ id: id, approval_name: authenticationState?.loginInfo?.name });
        dispatchGetAllExplains({
          org_id: authenticationState.loginInfo['org_ids'][0],
          page: page,
          limit: 1000
        });
        dispatchAddNofitication({
          create_date: dayjs().format('x'),
          user_id: params['row']['user_id'],
          create_name: authenticationState?.loginInfo?.name,
          content: `${authenticationState?.loginInfo?.name} đã duyệt đơn giải trình của bạn `,
          targetId: id
        });
        setLoading(!loading);
      }
    },
    [
      authenticationState.loginInfo,
      dispatchAddNofitication,
      dispatchGetAllExplains,
      dispatchUpdateExplain,
      dispatchUpdateTimeSheet,
      loading,
      page
    ]
  );

  const columns = [
    { field: 'user_name', headerName: t('table.requestForm.makePeople'), flex: 1 },
    { field: 'place_name', headerName: t('table.requestForm.place'), flex: 1 },
    {
      field: 'date_explain',
      headerName: t('table.requestForm.dateexplain'),
      flex: 1,
      renderCell: (item) => {
        return <div>{`${dayjs(item['row']['date_explain']).format('DD-MM-YYYY HH:MM:s')}`}</div>;
      }
    },
    { field: 'status', headerName: t('table.requestForm.typeForm'), flex: 1 },
    { field: 'active', headerName: t('table.requestForm.active'), flex: 1 },
    { field: 'approval_name', headerName: t('table.requestForm.approvalpeople'), flex: 1 },
    { field: 'decription', headerName: t('table.requestForm.decription'), flex: 1 },
    {
      field: 'custom',
      headerName: t('table.requestForm.custom'),
      renderCell: (params) => (
        <>
          <Popconfirm
            title="Bạn có chắc chắn muốn duyệt đơn này?"
            onConfirm={() => handleChangeEditExplainModal(params['row']['id'], params)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <IconButton aria-label="edit" color="primary">
              <AiFillEdit size={22} />
            </IconButton>
          </Popconfirm>
          <Popconfirm title="Bạn có chắc chắn muốn xoá?" onConfirm={() => handleDelete(params)} okText="Đồng ý" cancelText="Hủy">
            <Button type="text" danger>
              <MdDelete color="tomato" size={22} />
            </Button>
          </Popconfirm>
        </>
      ),
      flex: 1
    }
  ];

  const handleChange = useCallback(
    (event, value) => {
      console.log('setPage', value);
      setPage(value);
      dispatchGetAllExplains({ params: { page: value } });
    },
    [dispatchGetAllExplains]
  );

  return (
    <MainCard>
      <ControlBar></ControlBar>
      <DataTableWrapper>
        <DataTable columns={columns} rows={Explains} checkboxSelection={false} />
      </DataTableWrapper>
      <PaginationWrapper>
        <Pagination count={explainsState.pagination.totalPages} page={page} onChange={handleChange} color="primary" />
      </PaginationWrapper>
    </MainCard>
  );
};

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

export default memo(LeaveRequestPage);
