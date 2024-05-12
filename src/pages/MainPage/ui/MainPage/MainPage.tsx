import React, { memo } from 'react';

import { ColumnsList } from '@/entities/Column';

import cls from './MainPage.module.scss'

const MainPage = () => (
    <main className={cls.MainPage}>
      <ColumnsList />
    </main>
  )

export default memo(MainPage);