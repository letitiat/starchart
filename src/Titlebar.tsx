import { getCurrentWindow } from "@tauri-apps/api/window";

function Titlebar() {
  const appWindow = getCurrentWindow();

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-button" onClick={() => appWindow.minimize()}>
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div className="titlebar-button" onClick={() => appWindow.toggleMaximize()}>
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className="titlebar-button" onClick={() => appWindow.close()}>
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  );
}

export default Titlebar;
