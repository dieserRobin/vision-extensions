import { useQuery } from "@tanstack/react-query";
import render from "../app/render";
import React from "react";
import useStorageSettings from "../hooks/storage";

interface Team {
  team: {
    id: string;
    uid: string;
    slug: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    color: string;
    alternateColor: string;
    logo: string;
  };
  displayOrder: number;
  homeAway: "home" | "away";
  score?: string;
  winner?: boolean;
}

interface BoxScore {
  teams: Team[];
}

interface Format {
  regulation: {
    periods: number;
    displayName: string;
    slug: string;
    clock: number;
  };
  overtime: {
    periods: number;
    displayName: string;
    slug: string;
    clock: number;
  };
}

interface GameInfo {
  venue: {
    id: string;
    fullName: string;
    address: {
      city: string;
    };
    grass: boolean;
  };
}

interface StatusType {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

interface CompetitionStatus {
  type: StatusType;
  clock: number;
  displayClock: string;
  period: number;
}

interface Competition {
  id: string;
  uid: string;
  date: string;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  competitors: Team[];
  status: CompetitionStatus;
}

interface ApiResponse {
  boxscore: BoxScore;
  format: Format;
  gameInfo: GameInfo;
  header: {
    competitions: Competition[];
  };
}

const Layer = () => {
  const { layerSettings } = useStorageSettings();

  console.log("layersettings", layerSettings);

  const latestMatchData = useQuery<ApiResponse>({
    queryKey: ["match"],
    queryFn: async () => {
      const response = await fetch("https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=401671803", {
        cache: "no-cache",
      });
      return response.json() as Promise<ApiResponse>;
    },
    refetchInterval: 1000,
  });

  const [match, setMatch] = React.useState<ApiResponse | null>(null);

  const delay = layerSettings ? (Object.keys(layerSettings).includes("delay") && layerSettings?.delay) ?? 6000 : 6000;

  React.useEffect(() => {
    if (latestMatchData.data) {
      setTimeout(() => {
        setMatch(latestMatchData.data);
      }, delay ?? 6000);
    }
  }, [latestMatchData.data, delay]);

  console.log("1", latestMatchData.data?.header.competitions[0].competitors[0].score)
  console.log("2", latestMatchData.data?.header.competitions[0].competitors[1].score)

  return (
    <main className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center bg-neutral-100 p-3 px-5 w-64" >
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center mr-4">
              <img src={latestMatchData.data?.boxscore.teams[0].team.logo} alt="logo" className="w-12 h-12" />
              <p style={{
                color: "#" + match?.boxscore.teams[0].team.color,
              }} className="text-sm font-bold">{latestMatchData.data?.boxscore.teams[0].team.abbreviation}</p>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-8 justify-center items-center">
                <p className="text-4xl font-bold">{match?.header.competitions[0].competitors[1].score ?? 0}</p>
                <p className="text-4xl font-bold">{match?.header.competitions[0].competitors[0].score ?? 0}</p>
              </div>
              <div className="flex flex-col items-center justify-center mx-8">
                <p className="text-sm">
                  {match?.header.competitions[0].status.period && (match?.header.competitions[0].status.period === 1
                    ? "1st"
                    : match?.header.competitions[0].status.period === 2
                      ? "2nd"
                      : match?.header.competitions[0].status.period === 3
                        ? "3rd"
                        : `${match?.header.competitions[0].status.period}th`)}
                </p>
                <p className="text-sm">{match?.header.competitions[0].status.displayClock}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ml-4">
              <img src={latestMatchData.data?.boxscore.teams[1].team.logo} alt="logo" className="w-12 h-12" />
              <p style={{
                color: "#" + match?.boxscore.teams[1].team.color,
              }} className="text-sm font-bold">{latestMatchData.data?.boxscore.teams[1].team.abbreviation}</p>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
};

render(<Layer />);
