import { memo } from 'react';

import cls from './Column.module.scss';

interface ColumnProps {
  
}

export const Column = memo((props: ColumnProps) => (
    <div className={cls.Column}>
      ..
    </div>
  ));
