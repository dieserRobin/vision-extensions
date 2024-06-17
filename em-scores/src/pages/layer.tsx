import { useQuery } from "@tanstack/react-query";
import render from "../app/render";

type GameData = {
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
  const match = useQuery<GameData>({
    queryKey: ["match"],
    queryFn: async () => {
      const response = await fetch("https://services.robin.software/v1/em");
      return response.json() as Promise<GameData>;
    },
    refetchInterval: 1000 * 15,
  });

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        {match.data && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <img src={match.data.homeTeam.logo} alt={match.data.homeTeam.name} className="w-16 h-16" />
              <div className="flex flex-col gap-0">
                <div className="text-white">
                  <div style={{
                    textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  }} className="text-sm mt-2 text-center uppercaser">{match.data.status === "UPCOMING" ? "Upcoming" : match.data.phase === "HALF_TIME_BREAK" ? "Half time break" : match.data.minute + "'"}</div>
                </div>
                <div className="text-white" style={{
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                }}>
                  <span className="text-2xl font-bold mx-4">{match.data.homeTeam.score}</span>
                  <span className="text-2xl font-bold">-</span>
                  <span className="text-2xl font-bold mx-4">{match.data.awayTeam.score}</span>
                </div>
              </div>
              <img src={match.data.awayTeam.logo} alt={match.data.awayTeam.name} className="w-16 h-16" />
            </div>
          </div>
        )
        }
      </div>
    </main>
  );
};

render(<Layer />);