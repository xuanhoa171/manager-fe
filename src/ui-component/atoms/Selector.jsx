import React, { memo } from 'react';
import { Select, Tag } from 'antd';
import styled from 'styled-components';

const TagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color="#4096ff"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3
      }}
    >
      {label}
    </Tag>
  );
};

const Selector = ({
  style = {},
  labelStyle = {},
  selectStyle = {},
  messageStyle = {},
  visileLabel = true,
  visibleMessage = true,
  mode = '',
  label = '',
  message = '', // messageText
  type = '', // '' | 'warning' | 'error'
  options = [],
  defaultValue = [],
  onFocus,
  onBlur,
  onChange,
  hiddenMode = 'hidden',
  value = [],
  ...restProps
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

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

  React.useEffect(() => {
    if (mode !== 'multiple' && Array.isArray(value) && value?.length > 1) {
      onChange && onChange([value[0]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <SelectWrapper style={style}>
      <Label style={labelStyle} className={`${visileLabel ? 'visible' : hiddenMode} ${isFocused ? 'focused' : ''}`}>
        {label}
      </Label>
      <SelectCustom
        mode={mode} // Nếu muốn sử dụng selector đơn thì truyền "" vào
        showArrow
        tagRender={TagRender}
        defaultValue={defaultValue}
        value={value}
        style={selectStyle}
        options={options}
        dropdownStyle={{
          zIndex: 9999
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...restProps}
      />
      <Message style={messageStyle} className={`${visibleMessage && type ? type : hiddenMode}`}>
        {message}
      </Message>
    </SelectWrapper>
  );
};

export default memo(Selector);

const SelectWrapper = styled.div`
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

const SelectCustom = styled(Select)`
  min-width: 200px;
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
