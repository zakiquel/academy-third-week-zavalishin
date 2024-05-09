import React, {
  InputHTMLAttributes,
  memo
} from 'react';

import { classNames, Mods } from "@/shared/lib/classNames/classNames";

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  label?: string;
  autofocus?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  value?: string | number;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    label,
    onChange,
    id,
    value,
    required,
    ...otherProps
  } = props;


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      <label>
        <span>{label}</span>
        <input
          id={id}
          type={type}
          value={value}
          className={cls.input}
          readOnly={readonly}
          required={required}
          onChange={onChangeHandler}
          {...otherProps}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
});
