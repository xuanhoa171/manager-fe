import { Input, Space } from 'antd';
import React, { useEffect, useState, useRef, memo } from 'react';
import styled from 'styled-components';
import checkValidMac from '~/handlers/checkValidMac';

const initOctets = ['', '', '', '', '', ''];

const MacAddressInput = ({ value, onChange, disabled, inputStyle = {}, style = {}, ...restProps }) => {
  const [octets, setOctets] = useState(initOctets);
  const counter = useRef(false);

  const handleOctetChange = (i, v) => {
    if (v && typeof v === 'string') {
      v = v.toUpperCase();
    }
    const newOctets = [...octets];
    newOctets[i] = v;
    setOctets(newOctets);
  };

  useEffect(() => {
    if (counter && checkValidMac(value) && !counter?.current) {
      counter.current = true;
      const octets = value?.split('-') || initOctets;
      setOctets(octets);
    }
  }, [value, counter]);

  useEffect(() => {
    const mac = octets.join('-');
    onChange && onChange(mac);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [octets]);

  useEffect(() => {
    if (disabled) {
      setOctets(initOctets);
    }
  }, [disabled]);

  return (
    <InputWrapper style={style}>
      <Space.Compact
        style={Object.assign(
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'fit-content'
          },
          inputStyle
        )}
        {...restProps}
      >
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[0]}
          onChange={(e) => handleOctetChange(0, e.target.value)}
          type="text"
          disabled={disabled}
        />
        <Point>-</Point>
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[1]}
          onChange={(e) => handleOctetChange(1, e.target.value)}
          type="text"
          disabled={disabled}
        />
        <Point>-</Point>
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[2]}
          onChange={(e) => handleOctetChange(2, e.target.value)}
          type="text"
          disabled={disabled}
        />
        <Point>-</Point>
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[3]}
          onChange={(e) => handleOctetChange(3, e.target.value)}
          type="text"
          disabled={disabled}
        />
        <Point>-</Point>
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[4]}
          onChange={(e) => handleOctetChange(4, e.target.value)}
          type="text"
          disabled={disabled}
        />
        <Point>-</Point>
        <Input
          placeholder="XX"
          maxLength={2}
          value={octets[5]}
          onChange={(e) => handleOctetChange(5, e.target.value)}
          type="text"
          disabled={disabled}
        />
      </Space.Compact>
    </InputWrapper>
  );
};

export default memo(MacAddressInput);

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  height: fit-content;
  position: relative;

  &.hidden {
    visibility: hidden;
  }

  &.none {
    display: none;
  }
`;

const Point = styled.div`
  position: relative;
  margin: 0 4px;
  padding-bottom: 3px;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  overflow: hidden;
`;
