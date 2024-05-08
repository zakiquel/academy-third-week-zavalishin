import { memo } from 'react';

import DarkIcon from "@/shared/assets/icons/theme-dark.svg";
import LightIcon from "@/shared/assets/icons/theme-light.svg";
import { Theme } from "@/shared/const/theme";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Button, ButtonTheme } from "@/shared/ui/Button";

import cls from './Navbar.module.scss';



export const Navbar = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cls.Navbar}>
      <div className={cls.container}>
        <h1 className={cls.appName}>Just do it!</h1>
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={toggleTheme}
        >
          {theme === Theme.DARK ? <LightIcon /> : <DarkIcon />}
        </Button>
      </div>
  </header>)
});
