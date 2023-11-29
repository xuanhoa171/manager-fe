import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import styled from 'styled-components';
import { useOrganizationsStore } from '~/hooks/organizations';
import { EditInput, Selector } from '~/ui-component/atoms';
import { useTranslation } from 'react-i18next';

const Information = ({ orgId, users }) => {
  const { organizationsState, dispatchGetOrganization, dispatchUpdateOrganization } = useOrganizationsStore();
  const { t } = useTranslation();
  const [fullname, setFullname] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [leader, setLeader] = useState('');

  const handleChange = useCallback(
    (type, value) => {
      if (orgId) {
        switch (type) {
          case 'fullname':
            setFullname(value);
            break;
          case 'name':
            setName(value);
            break;
          case 'code':
            setCode(value);
            break;
          case 'leader':
            setLeader(value);
            break;
        }

        dispatchUpdateOrganization({
          id: orgId,
          [type]: value
        });
      }
    },
    [dispatchUpdateOrganization, orgId]
  );

  const leaderOptions = useMemo(() => {
    return (
      users.map((one) => ({
        label: one?.name || '',
        value: one?.id || ''
      })) || []
    );
  }, [users]);

  useEffect(() => {
    if (orgId) {
      dispatchGetOrganization(orgId);
    }
  }, [dispatchGetOrganization, orgId]);

  useEffect(() => {
    if (organizationsState?.detail) {
      const data = organizationsState.detail;
      setFullname(data.fullname || '');
      setName(data.name || '');
      setCode(data.code || '');
      setLeader(data.leader?.id || '');
    }
  }, [organizationsState?.detail]);

  return (
    <InformationWrapper>
      <EditInput
        value={fullname}
        onSave={(value) => handleChange('fullname', value)}
        style={{
          fontSize: '20px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
      <Selector
        label={`* ${t('input.label.organization.leader')}`}
        name="leader"
        mode=""
        labelStyle={{
          width: '170px',
          minWidth: '120px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          height: '100%',
          padding: '4px 11px',
          display: 'flex',
          alignItems: 'flex-end'
        }}
        style={{
          width: '200px',
          display: 'flex',
          flexDirection: 'row'
        }}
        selectStyle={{
          width: '200px'
        }}
        options={leaderOptions}
        value={leader}
        onChange={(value) => handleChange('leader', value)}
      />
      <EditInput
        value={name}
        onSave={(value) => handleChange('name', value)}
        label={`* ${t('input.label.organization.name')}`}
        labelStyle={{
          width: '170px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
      <EditInput
        value={code}
        onSave={(value) => handleChange('code', value)}
        label={`* ${t('input.label.organization.code')}`}
        labelStyle={{
          width: '170px',
          fontWeight: '600',
          minWidth: '120px'
        }}
      />
    </InformationWrapper>
  );
};

export default memo(Information);

const InformationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 8px;
  }
`;
