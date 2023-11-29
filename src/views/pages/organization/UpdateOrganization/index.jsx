import { Button } from 'antd';
import React, { useCallback, useEffect, useState, memo } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { usePlacesStore } from '~/hooks/places';
import { useUsersStore } from '~/hooks/users';
import { Modal } from '~/ui-component/molecules';
import Information from './Information';
import MapOrganization from './MapOrganization';
import TablePlaces from './TablePlaces';
import TableUsers from './TableUsers';
import AddPlace from './AddPlace.jsx';
import UpdatePlace from './UpdatePlace.jsx';
import { useTranslation } from 'react-i18next';

const UpdateOrganization = ({ id, open, setOpen }) => {
  const { t } = useTranslation();
  const { placesState, dispatchGetAllPlaces } = usePlacesStore();
  const { usersState, dispatchGetAllUsers } = useUsersStore();
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false);
  const [openEditPlaceModal, setOpenEditPlaceModal] = useState({
    status: false,
    id: ''
  });

  const [focusMarker, setFocusMarker] = useState({
    zoom: 8
  });

  const handleChangeEditPlaceModal = useCallback((props) => {
    if (typeof props === 'boolean') {
      setOpenEditPlaceModal({
        status: props,
        id: ''
      });
    } else if (typeof props !== 'object') {
      return undefined;
    }

    const { status, id } = props;

    if (!id) {
      setOpenEditPlaceModal({
        status: false,
        id: ''
      });
    } else {
      setOpenEditPlaceModal({
        status,
        id
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatchGetAllPlaces({
        params: {
          org_id: id
        }
      });
    }
  }, [dispatchGetAllPlaces, id]);

  useEffect(() => {
    if (id) {
      dispatchGetAllUsers({
        params: {
          org_ids: id
        }
      });
    }
  }, [dispatchGetAllUsers, id]);

  useEffect(() => {
    setFocusMarker(Object.assign({}, placesState.places[0], { zoom: 8 }));
  }, [placesState.places]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title={t('modal.organization.editOrganization')}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width="95%"
      okText={t('modal.organization.submitEditOrganization')}
      cancelText={t('modal.organization.cancel')}
      footer={null}
    >
      <Controller>
        <Button type="primary" icon={<FaMapMarkerAlt />} onClick={() => setOpenAddPlaceModal(true)}>
          {t('modal.place.addPlace')}
        </Button>
      </Controller>
      <Wrapper>
        <Cell>
          <Information orgId={id} users={usersState.users} />
        </Cell>
        <Cell>
          <MapOrganization focusMarker={focusMarker} places={placesState.places} />
        </Cell>
        <Cell>
          <TableUsers users={usersState.users} orgId={id} />
        </Cell>
        <Cell>
          <TablePlaces
            places={placesState.places}
            onFocusMarker={setFocusMarker}
            orgId={id}
            onChangeEditPlaceModal={handleChangeEditPlaceModal}
          />
        </Cell>
      </Wrapper>
      <AddPlace open={openAddPlaceModal} setOpen={setOpenAddPlaceModal} orgId={id} />
      <UpdatePlace open={openEditPlaceModal.status} setOpen={handleChangeEditPlaceModal} id={openEditPlaceModal.id} orgId={id} />
    </Modal>
  );
};

export default memo(UpdateOrganization);

const Controller = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  padding-bottom: 8px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr 1fr; /* 2 hàng bằng nhau */
  grid-template-columns: 1fr 1.3fr; /* 2 cột bằng nhau */
  gap: 10px; /* Khoảng cách giữa các vùng */
`;

const Cell = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f1f6f9;
  border-radius: 8px;
  padding: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
