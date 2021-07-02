
import { useSelector } from 'react-redux';
import ScoreboardRow from '../ScoreboardRow';

type Matchups = {
    points1: string,
    points2: string,
    roster1: string,
    roster2: string
}

const Scoreboard = () => {

    const state = useSelector((state: any) => state)

    let matchups: Matchups[] = [];
    if (state.espn.espnReport) {
        matchups = state.espn.espnMatchups
    } else if (state.sleeper.sleeperReport) {
        matchups = state.sleeper.sleeperMatchups
    }

    let week: string = "";
    if (state.espn.espnReport) {
        week = state.espn.espnWeek
    } else if (state.sleeper.sleeperReport) {
        week = state.sleeper.sleeperWeek;
    }

    return (
        <div className="scoreboard">
            <p className="reportTitle reportTitle__scoreboard">SCOREBOARD</p>

            <p className="scoreboard__week">Week {week}</p>
                {matchups.map((matchup, i) => (
                    <ScoreboardRow
                        key={i}
                        points1={matchup.points1}
                        points2={matchup.points2}
                        roster1={matchup.roster1}
                        roster2={matchup.roster2}
                    />
                ))}
        </div>
    );
}

export default Scoreboard;