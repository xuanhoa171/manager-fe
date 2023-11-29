import React, { memo } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const AtomInput = (props) => {
  const {
    style = {}, // custom style cho wrapper
    labelStyle = {}, // custom style cho label
    inputStyle = {}, // custom style cho input
    messageStyle = {}, // custom style cho message
    visileLabel = true, // Có hiện label hay không?
    visibleMessage = true, // Có hiện message hay không?
    label = '', // labelText
    message = '', // messageText
    type = '', // '' | 'warning' | 'error'
    onFocus, // onFocus
    onBlur, // onBlur
    onChange, // hàm bắt sự kiện onChange
    hiddenMode = 'hidden', // hidden || none Có 2 cách ẩn input: ẩn hoàn toàn với display = none, chỉ ẩn phần tử nhưng vẫn giữ nguyên vị trí với visibility = hidden
    isTextArea = false, // Có để nó là textArea không?
    ...restProps // Tất cả những props được truyền vào khác với các props bên trên sẽ được truyền cho thẻ Input của antd
    // Có thể sử dụng các thuộc tính của thẻ Input antd như bình thường.
  } = props;

  const [isFocused, setIsFocused] = React.useState(false);

  const id = React.useMemo(() => {
    return uuidv4();
  }, []);

  const handleFocus = React.useCallback(
    (...args) => {
      setIsFocused(true);
      onFocus && onFocus(...args);
    },
    [onFocus]
  );

  const handleBlur = React.useCallback(
    (...args) => {
      setIsFocused(false);
      onBlur && onBlur(...args);
    },
    [onBlur]
  );

  return (
    <InputWrapper style={style}>
      <Label htmlFor={id} style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode} ${isFocused ? 'focused' : ''}`}>
        {label}
      </Label>
      {isTextArea ? (
        <TextArea id={id} status={type} style={inputStyle} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} {...restProps} />
      ) : (
        <Input id={id} status={type} style={inputStyle} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} {...restProps} />
      )}
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </InputWrapper>
  );
};

export default memo(AtomInput);

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

const Label = styled.label`
  position: relative;
  font-weight: 600;

  &.focused {
    color: #4096ff;
  }
`;

const Message = styled.span`
  position: relative;
  height: 12px;
  font-size: 12px;

  &.error {
    color: #ff4d4f;
  }

  &.warning {
    color: #faad14;
  }
`;
