import { Input } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Map } from '~/ui-component/molecules';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';

const defaultPosition = {
  long: 105.85939990733658,
  lat: 21.028083539099526
};

const SelectPosition = ({ formik }) => {
  const { t } = useTranslation();

  const [focus, setFocus] = useState({});

  const debounced = useDebouncedCallback(({ lat, long }) => {
    setFocus({ lat, long, zoom: 14 });
  }, 500);

  const handleClick = useCallback(
    (e) => {
      const { lngLat } = e;
      if (lngLat) {
        formik.setFieldValue('lat', lngLat?.lat || '');
        formik.setFieldValue('long', lngLat?.lng || '');
      }
    },
    [formik]
  );

  const markes = useMemo(() => {
    if (typeof formik.values.lat === 'number' && typeof formik.values.long === 'number') {
      const coordinate = {
        lat: formik.values.lat,
        long: formik.values.long
      };
      debounced(coordinate);
      return [coordinate];
    } else {
      return [];
    }
  }, [debounced, formik.values.lat, formik.values.long]);

  return (
    <SelectPositionWrapper>
      <InputPositionWrapper>
        <Input
          name="long"
          placeholder={`* ${t('input.label.place.long').toLowerCase()}`}
          addonAfter="°"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.long}
          type="number"
          step="any"
          inputMode="decimal"
        />
        <Input
          name="lat"
          placeholder={`* ${t('input.label.place.lat').toLowerCase()}`}
          addonAfter="°"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lat}
          type="number"
          step="any"
          inputMode="decimal"
        />
      </InputPositionWrapper>
      <Map
        markers={markes}
        initialViewState={{
          lat: defaultPosition.lat,
          long: defaultPosition.long,
          zoom: 8
        }}
        onClick={handleClick}
        focus={focus}
      />
    </SelectPositionWrapper>
  );
};

export default memo(SelectPosition);

const SelectPositionWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const InputPositionWrapper = styled.div`
  width: 100%;
  position: relative;
  height: fit-content;
  display: flex;
  flex-direction: row;
  padding: 8px 0;

  & > *:first-child {
    margin-right: 8px;
  }
`;
