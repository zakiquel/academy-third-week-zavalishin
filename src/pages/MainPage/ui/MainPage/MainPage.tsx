import React, { memo } from 'react';

import { ColumnsList } from '@/entities/Column';
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import cls from './MainPage.module.scss'

const MainPage = () => {
  const dispatch = useAppDispatch();

  return (
    <main className={cls.MainPage}>
      <ColumnsList />
    </main>
  )

}

export default memo(MainPage);