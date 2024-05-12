import React, { ChangeEvent, useMemo } from 'react';

// eslint-disable-next-line zavalition-fsd/layer-imports
import { classNames, Mods } from "@/shared/lib/classNames/classNames";

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value: T;
  readonly?: boolean;
  onChange?: (value: T) => void;
  max?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    readonly,
    value,
    onChange,
    max
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const optionList = useMemo(() =>
    options?.map((opt) => (
      <option value={opt.value} className={cls.option} key={opt.value}>
        {opt.content}
      </option>
    )), [options]
  )

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.max]: max,
  };

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{label}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  );
};