import React, { memo } from 'react';
import { Map } from '~/ui-component/molecules';

const defaultPosition = {
  long: 105.85939990733658,
  lat: 21.028083539099526,
  zoom: 8
};

const MapOrganization = ({ focusMarker, places }) => {
  console.log('places', places);
  return <Map markers={places} focus={focusMarker} initialViewState={places[0] || defaultPosition} />;
};

export default memo(MapOrganization);
