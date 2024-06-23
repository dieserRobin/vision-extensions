import { useQuery } from "@tanstack/react-query";
import render from "../app/render";
import useStorageSettings from "../hooks/storage";
import { useMemo } from "react";

export type GameData = {
  id: string;
  status: string;
  homeTeam: {
    name: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    logo: string;
    score: number;
  };
  startTime: string;
  phase: string;
  minute: number;
}

const Layer = () => {
  const { layerSettings } = useStorageSettings();

  const match = useQuery<GameData[]>({
    queryKey: ["match"],
    queryFn: async () => {
      const response = await fetch("https://services.robin.software/v1/em");
      return response.json() as Promise<GameData[]>;
    },
    refetchInterval: 1000 * 15,
  });

  const currentMatch = useMemo(() => layerSettings?.selectedMatch ? match.data?.find((match) => match.id === layerSettings?.selectedMatch) : match.data?.[0], [layerSettings, match.data]);

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        {currentMatch && (
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-blue-600 p-3 rounded-xl">
            <div className="flex items-center justify-center">
              <img src={currentMatch.homeTeam.logo} alt={currentMatch.homeTeam.name} className="w-8 h-8" />
              <div className="flex flex-col gap-0">
                <div className="text-white">
                </div>
                <div className="bg-white text-blue-500 rounded-full mx-2">
                  <span className="text-2xl font-bold mx-4">{currentMatch.homeTeam.score}</span>
                  <span className="text-2xl font-bold"></span>
                  <span className="text-2xl font-bold mx-4">{currentMatch.awayTeam.score}</span>
                </div>
              </div>
              <img src={currentMatch.awayTeam.logo} alt={currentMatch.awayTeam.name} className="w-8 h-8" />

              <div className="text-sm ml-2 text-center uppercase text-white">{currentMatch.status === "UPCOMING" ? "Upcoming" : currentMatch.phase === "HALF_TIME_BREAK" ? "Half time break" : currentMatch.phase === "FINISHED" ? "Finished" : currentMatch.minute + "'"}</div>
            </div>
          </div>
        )
        }
      </div>
    </main >
  );
};

render(<Layer />);