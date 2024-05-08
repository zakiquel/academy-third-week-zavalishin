import { memo } from 'react';

import cls from './ColumnsList.module.scss';

interface ColumnsListProps {
  
}

export const ColumnsList = memo((props: ColumnsListProps) => (
    <div className={cls.ColumnsList}>
      ..
    </div>
  ));
