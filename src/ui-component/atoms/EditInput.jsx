import { Input, Button } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { FcCheckmark } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const EditInput = ({ onSave, value, onChange, onCancel, onFocus, onBlur, labelStyle, label, ...restProps }) => {
  const [initValue, setInitValue] = useState('');
  const [tempValue, setTempValue] = useState('');
  const [edit, setEdit] = useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef();

  const id = React.useMemo(() => {
    return uuidv4();
  }, []);

  const handleFocus = React.useCallback(
    (...args) => {
      setIsFocused(true);
      setEdit(true);
      onFocus && onFocus(...args);
    },
    [onFocus]
  );

  const handleBlur = React.useCallback(
    (...args) => {
      setIsFocused(false);
      setEdit(false);

      onBlur && onBlur(...args);
    },
    [onBlur]
  );

  const handleClickEditBtn = useCallback(() => {
    setEdit(true);
    inputRef?.current?.focus();
  }, []);

  const handleSave = useCallback(() => {
    setEdit(false);
    onSave && onSave(tempValue);
  }, [onSave, tempValue]);

  const handleCancel = useCallback(() => {
    setEdit(false);
    setTempValue(initValue);
    onCancel && onCancel(initValue);
  }, [initValue, onCancel]);

  const handleChange = useCallback(
    (e) => {
      const value = e?.target?.value || '';
      onChange && onChange(value);
      setTempValue(value);
    },
    [onChange]
  );

  useEffect(() => {
    setInitValue(value);
    setTempValue(value);
  }, [value]);

  return (
    <InputWrapper onBlur={handleBlur}>
      <Label htmlFor={id} style={labelStyle} className={`${!label ? 'hidden' : 'visible'} ${isFocused ? 'focused' : ''}`}>
        {label}
      </Label>
      <InputCustom
        ref={inputRef}
        id={id}
        className={`${isFocused || edit ? 'focused' : ''}`}
        onFocus={handleFocus}
        bordered={false}
        value={tempValue}
        onChange={handleChange}
        {...restProps}
      />
      <IconButtonCustom type="text" shape="round" onClick={handleClickEditBtn} className={`${edit ? 'hidden' : 'visible'}`}>
        <CiEdit color="#4096ff" size={22} />
      </IconButtonCustom>
      <IconButtonCustom type="default" shape="circle" onClick={handleSave} className={`${!edit ? 'hidden' : 'visible'}`}>
        <FcCheckmark color="#4096ff" size={21} />
      </IconButtonCustom>
      <IconButtonCustom type="default" shape="circle" onClick={handleCancel} className={`${!edit ? 'hidden' : 'visible'}`}>
        <MdClose color="tomato" size={22} />
      </IconButtonCustom>
    </InputWrapper>
  );
};

export default memo(EditInput);

const InputWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Label = styled.label`
  white-space: nowrap;
  position: relative;
  width: 100px;
  height: 100%;
  padding: 4px 11px;
  display: flex;
  align-items: flex-end;

  &.hidden {
    display: none;
  }

  &.focused {
    color: #4096ff;
  }
`;

const InputCustom = styled(Input)`
  border: none;
  outline: none;
  min-width: fit-content;

  &:hover {
    background-color: #d3dfe8;
  }

  &.focused {
    background-color: #d3dfe8;
    outline: 1px solid #4096ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
  }
`;

const IconButtonCustom = styled(Button)`
  margin-left: 8px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.hidden {
    visibility: hidden;
  }

  &:hover {
    svg {
      color: #4096ff;
    }
  }

  svg polygon {
    color: #4096ff;
    fill: #4096ff !important;
  }
`;
