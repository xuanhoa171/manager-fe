import { Modal } from 'antd';
import { memo, useCallback } from 'react';

const App = (props) => {
  const { title, onConfirm, open, onOpen, style, children, ...restProps } = props;

  const handleConfirm = useCallback(
    (value) => {
      if (onConfirm) onConfirm(value);
      if (onOpen) onOpen(false);
    },
    [onConfirm, onOpen]
  );

  return (
    <>
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
        width={1000}
        style={style}
        destroyOnClose={true}
        {...restProps}
      >
        {open && children}
      </Modal>
    </>
  );
};
export default memo(App);
