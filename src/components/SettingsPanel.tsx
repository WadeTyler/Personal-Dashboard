import CloseButton from "./CloseButton.tsx";
import {FormEvent, SetStateAction} from "react";
import {Settings} from "../types/settings.types.ts";
import * as React from "react";

const SettingsPanel = ({closeSettings, settings, setSettings, loadSettings}: {
  closeSettings: () => void;
  settings: Settings,
  setSettings: React.Dispatch<SetStateAction<Settings>>;
  loadSettings: () => void;
}) => {

  function saveChanges(event: FormEvent) {
    event.preventDefault();

    // Update localstorage
    localStorage.setItem('settings', JSON.stringify(settings));

    // Reload Settings
    loadSettings();
    closeSettings();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={saveChanges}
        className="w-96 flex flex-col items-center justify-center rounded-md shadow-md bg-zinc-800 text-white gap-4 overflow-hidden"
      >
        <section className="flex justify-between items-center w-full px-4 pt-4 gap-2">
          <legend className="text-3xl font-semibold">Settings</legend>
          <CloseButton closeFn={() => {
            loadSettings();
            closeSettings();
          }}/>
        </section>

        <fieldset className="input-container">
          <label className="input-label">Background Image</label>
          <input
            type="text"
            className="input-bar"
            placeholder="Background Image URL"
            value={settings.backgroundImage || ""}
            onChange={(event) => {
              setSettings((prev) => ({
                ...prev,
                backgroundImage: event.target.value
              }));
            }}
          />

          <label className="input-label">Background Brightness</label>
          <input
            type="range"
            min={0}
            max={100}
            value={settings.bgImageBrightness}
            onChange={(event) => {
              console.log("Slider val: ", event.target.valueAsNumber)
              setSettings((prev) => ({
                ...prev,
                bgImageBrightness: event.target.valueAsNumber
              }));
            }}
            className="w-full text-primary bg-zinc-600 appearance-none rounded-full"
          />

        </fieldset>

        {/* Action Buttons */}
        <fieldset className="w-full flex gap-4 p-4 bg-zinc-900">
          <button className="submit-btn w-full">Save Changes</button>
        </fieldset>


      </form>
    </div>
  );
};

export default SettingsPanel;