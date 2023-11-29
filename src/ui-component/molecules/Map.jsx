import React, { memo, useEffect, useRef } from 'react';
import { IoMdPin } from 'react-icons/io';
import { FullscreenControl, Map, Marker } from 'react-map-gl';
import { GeocoderControl } from '~/ui-component/atoms';
import styled from 'styled-components';

function MapCustom({ initialViewState, focus, markers, ...restProps }) {
  const map = useRef();

  useEffect(() => {
    if (map?.current && focus?.long && focus?.lat) {
      map.current.flyTo({ center: [focus?.long, focus?.lat], zoom: focus?.zoom || 8 });
    }
  }, [focus, map]);

  return (
    <Map
      ref={map}
      id="map-id"
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: initialViewState?.long,
        latitude: initialViewState?.lat,
        zoom: initialViewState?.zoom || 8
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoic2FuZ2hoIiwiYSI6ImNsaGV0ZmRieTByZ3AzanA0bmhhdHk1NjEifQ.spO_SkdSwB39JXWDOCgW6w"
      {...restProps}
    >
      {markers?.map((marker, index) => (
        <Marker longitude={marker?.long} latitude={marker?.lat} anchor="bottom" key={index}>
          <MarkerWrapper>
            <IoMdPin color="#4096ff" size={26} />
            <MarkerLabel>{marker?.name || ''}</MarkerLabel>
          </MarkerWrapper>
        </Marker>
      ))}
      <FullscreenControl position="top-left" />
      <GeocoderControl
        mapboxAccessToken="pk.eyJ1Ijoic2FuZ2hoIiwiYSI6ImNsaGV0ZmRieTByZ3AzanA0bmhhdHk1NjEifQ.spO_SkdSwB39JXWDOCgW6w"
        position="top-right"
      />
    </Map>
  );
}

export default memo(MapCustom);

const MarkerWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

const MarkerLabel = styled.span`
  color: black;
  font-size: 13px;
  color: #1677ff;
  font-weight: 500;
  text-shadow: 0 0 5px solid white;
  text-transform: capitalize;
  font-smoothing: subpixel-antialiased;
`;
