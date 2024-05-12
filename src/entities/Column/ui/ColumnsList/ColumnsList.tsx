import { memo, useState } from 'react';

import { columnApi } from '../../api/columnApi';
import { ColumnListItem } from "../ColumnListItem/ColumnListItem";
import { AddColumnModal } from "../addColumn/AddColumnModal/AddColumnModal";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Loader } from "@/shared/ui/Loader";

import cls from './ColumnsList.module.scss';

interface ColumnsListProps {
  className?: string;
}

export const ColumnsList = memo(({ className }: ColumnsListProps) => {

  const [showColumnModal, setShowColumnModal] = useState<boolean>(false);
  const { isLoading, data, error } = columnApi.useGetColumnsQuery('');

  if (isLoading) {
    return <Loader className={cls.loader} />
  }

  if (!data || error) {
    return (
      <div className={cls.error}>
        <span>Ошибка загрузки данных :(</span>
      </div>
    )
  }

  if (data && data.length === 0) {
    return (
      <div className={cls.suggestion}>
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={() => setShowColumnModal(true)}
        >
          Создать заметку
        </Button>
        <AddColumnModal
          isOpen={showColumnModal}
          onClose={() => setShowColumnModal(false)}
        />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ColumnsList, {}, [className])}>
      {data.map((item) => (
        <ColumnListItem
          key={item.title}
          column={item}
        />
      ))}
      <div className={cls.addContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={() => setShowColumnModal(true)}
        >
          <span>+</span>
        </Button>
      </div>
      <AddColumnModal
        isOpen={showColumnModal}
        onClose={() => setShowColumnModal(false)}
      />
    </div>
  )
});
