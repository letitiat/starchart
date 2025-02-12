import { getCurrentWindow } from "@tauri-apps/api/window";
import styles from './TitleBar.module.scss';

export const Titlebar = () => {
  const appWindow = getCurrentWindow();

  return (
    <div data-tauri-drag-region className={styles.titlebar}>
      <div className={styles.titlebar__button} onClick={() => appWindow.minimize()}>
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div className={styles.titlebar__button} onClick={() => appWindow.toggleMaximize()}>
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className={styles.titlebar__button} onClick={() => appWindow.close()}>
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  );
}
