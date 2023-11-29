import React, { memo, useCallback, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Modal } from '~/ui-component/molecules';
import { Button } from 'antd';
import { FaDownload } from 'react-icons/fa';
import styled from 'styled-components';

const QrCode = ({ id, open, setOpen }) => {
  const ref = useRef(null);

  const handleDownloadQrCode = useCallback(() => {
    if (ref?.current) {
      const svgData = new XMLSerializer().serializeToString(ref.current);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `QRCode - ${id}`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  }, [id]);

  return (
    <Modal
      open={open}
      onOpen={setOpen}
      title="Qr Code"
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width="450px"
      okText="Xác nhận"
      cancelText="Hủy bỏ"
      style={{
        padding: '16px'
      }}
      footer={null}
    >
      <QRCode size={256} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={id} viewBox={`0 0 256 256`} ref={ref} />
      <ButtonCustom type="primary" icon={<FaDownload />} onClick={handleDownloadQrCode}>
        Download
      </ButtonCustom>
    </Modal>
  );
};

export default memo(QrCode);

const ButtonCustom = styled(Button)`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;