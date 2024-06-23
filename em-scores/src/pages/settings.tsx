import { useQuery } from "@tanstack/react-query";
import render from "../app/render";
import useStorageSettings from "../hooks/storage";
import { GameData } from "./layer";
import { useEffect, useState } from "react";

const Settings = () => {
  const { layerSettings, updateStorage } = useStorageSettings();

  const match = useQuery<GameData[]>({
    queryKey: ["match"],
    queryFn: async () => {
      const response = await fetch("https://services.robin.software/v1/em");
      return response.json() as Promise<GameData[]>;
    },
    refetchInterval: 1000 * 15,
  });

  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  useEffect(() => {
    if (layerSettings) {
      setSelectedMatch(layerSettings.selectedMatch);
    }
  }, [layerSettings]);

  const handleMatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMatch(event.target.value);
    updateStorage({
      layer: {
        selectedMatch: event.target.value,
      },
    });
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#171717] p-3">
      <h3 className="text-white text-lg font-bold">Selected Match</h3>

      <select
        className="w-full p-2 mt-2 bg-[#1e1e1e] text-white rounded-md"
        value={selectedMatch || ""}
        onChange={handleMatchChange}
      >
        {match.data?.map((match) => (
          <option key={match.startTime} value={match.id}>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </option>
        ))}
      </select>
    </main>
  );
};

render(<Settings />);
