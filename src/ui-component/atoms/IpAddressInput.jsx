import React, { useEffect, useState, useRef, memo } from 'react';
import { Input, Space } from 'antd';
import styled from 'styled-components';
import checkValidIp from '~/handlers/checkValidIp';

const MAX_OCTET_LENGTH = 3;

const initOctets = ['', '', '', ''];

const IpAddressInput = ({ value, onChange, disabled, inputStyle = {}, style = {}, ...restProps }) => {
  const [octets, setOctets] = useState(initOctets);
  const counter = useRef(false);

  const handleOctetChange = (i, v) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>-]/;

    if (parseInt(v) < 0 || specialCharRegex.test(v)) return;
    if (v?.length > 3) {
      v = v.slice(0, MAX_OCTET_LENGTH);
    }

    const newOctets = [...octets];
    newOctets[i] = v;
    setOctets(newOctets);
  };

  useEffect(() => {
    if (counter && checkValidIp(value) && !counter?.current) {
      counter.current = true;
      const octets = value?.split('.') || initOctets;
      setOctets(octets);
    }
  }, [value, counter]);

  useEffect(() => {
    const ip = octets.join('.');
    onChange && onChange(ip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [octets]);

  // useEffect(() => {
  //   if (disabled) {
  //     setOctets(initOctets);
  //   }
  // }, [disabled]);

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
        <InputCustom
          placeholder="XXX"
          maxLength={3}
          value={octets[0]}
          onChange={(e) => handleOctetChange(0, e.target.value)}
          type="number"
          disabled={disabled}
        />
        <Point>.</Point>
        <InputCustom
          placeholder="XXX"
          maxLength={3}
          value={octets[1]}
          onChange={(e) => handleOctetChange(1, e.target.value)}
          type="number"
          disabled={disabled}
        />
        <Point>.</Point>
        <InputCustom
          placeholder="XXX"
          maxLength={3}
          value={octets[2]}
          onChange={(e) => handleOctetChange(2, e.target.value)}
          type="number"
          disabled={disabled}
        />
        <Point>.</Point>
        <InputCustom
          placeholder="XXX"
          maxLength={3}
          value={octets[3]}
          onChange={(e) => handleOctetChange(3, e.target.value)}
          type="number"
          disabled={disabled}
        />
      </Space.Compact>
    </InputWrapper>
  );
};

export default memo(IpAddressInput);

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

const InputCustom = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
