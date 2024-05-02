import { useState, useEffect } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineRestartAlt } from "react-icons/md";

// import SettingsModal from "@/components/Modals/SettingsModal";
import { ISettings } from "../Playground/Playground";
import SettingsModal from "@/component/Modals/SettingsModal";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
  Rest: any;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  settings,
  setSettings,
  Rest,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full ">
      <div className="flex items-center ">
        <button className="flex justify-center cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 w-32 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <select className=" text-label-2 dark:text-dark-label-2 bg-transparent w-28 text-center text-sm">
              <option
                value="JavaScript"
                className=" bg-dark-layer-2 w-full h-4"
              >
                JavaScript
              </option>
              <option value="C++" className=" bg-dark-layer-2 w-full h-28">
                C++
              </option>
              <option value="Python" className=" bg-dark-layer-2 w-full h-28">
                Python
              </option>
              <option value="Java" className=" bg-dark-layer-2 w-full h-28">
                Java
              </option>
            </select>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button className="preferenceBtn group text-dark-gray-6" onClick={Rest}>
          <MdOutlineRestartAlt />
        </button>
        <button
          className="preferenceBtn group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-xl">
            <AiOutlineSetting  />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>

          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};
export default PreferenceNav;
