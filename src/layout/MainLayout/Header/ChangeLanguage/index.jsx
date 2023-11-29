import { Switch } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  const [isVietnamese, setIsVietnamese] = useState(i18n.language === 'vi');

  const handleChangeLanguage = useCallback(
    (status) => {
      i18n.changeLanguage(status ? 'vi' : 'en');
      setIsVietnamese(status);
    },
    [i18n]
  );

  return (
    <Switch
      checked={isVietnamese}
      checkedChildren="vi"
      unCheckedChildren="en"
      size="default"
      onChange={() => {
        handleChangeLanguage(!isVietnamese);
      }}
      style={{
        backgroundColor: !isVietnamese ? 'tomato' : '#1e88e5',
        transition: '0.3s'
      }}
    />
  );
};

export default memo(ChangeLanguage);
