import React, { memo } from 'react';

import cls from './MainPage.module.scss'

const MainPage = () => (
    <main
      className={cls.MainPage}
     />
  );

export default memo(MainPage);