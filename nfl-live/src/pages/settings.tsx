import render from "../app/render";
import useStorageSettings from "../hooks/storage";
import { useEffect, useState } from "react";

const Settings = () => {
  const { layerSettings, updateStorage } = useStorageSettings();

  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    if (layerSettings) {
      setDelay(layerSettings.delay);
    }
  }, [layerSettings]);

  const handleDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
    updateStorage({
      layer: {
        delay: Number(event.target.value),
      },
    });
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#171717] p-3">
      <h3 className="text-white text-lg font-bold">Delay</h3>
      <input type="number" value={delay + ""} onChange={handleDelayChange} className="bg-[#333] text-white p-2 rounded-md w-full" />
    </main>
  );
};

render(<Settings />);
