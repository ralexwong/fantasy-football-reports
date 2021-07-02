
import { useSelector } from 'react-redux';

type Recap = {
  abbrev: string,
  PPGcolor: string,
  PFcolor: string,
  PAcolor: string,
  PPG: string,
  PF: string,
  PA: string,
  wins: string,
  losses: string
}

const Recap = () => {
  const state = useSelector((state: any) => state)

  let week: string = "";
  if (state.espn.espnReport && state.espn.espnWeek) {
    week = state.espn.espnWeek
  } else if (state.sleeper.sleeperReport && state.sleeper.sleeperWeek) {
    week = state.sleeper.sleeperWeek;
  }

  let recap: Recap[] = [];
  if (state.espn.espnReport && state.espn.espnRecap) {
    recap = state.espn.espnRecap
  } else if (state.sleeper.sleeperReport && state.sleeper.sleeperRecap) {
    recap = state.sleeper.sleeperRecap
  }

  return (
    <div className="recap">
      <p className="reportTitle">NUMBERS RECAP</p>
      <table>
        <thead>
          <tr>
            <th className="recap__week">Week {week}</th>
          </tr>
          <tr>
            <th>Team</th>
            <th>Rank</th>
            <th>PF/G</th>
            <th>PF</th>
            <th>PA</th>
            <th>W</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {(recap ? 
            (
              recap.map((row, i) => (
                <tr key={i}>
                  <td>{row.abbrev}</td>
                  <td>{(i+1)}</td>
                  <td className={row.PPGcolor}>{row.PPG}</td>
                  <td className={row.PFcolor}>{row.PF}</td>
                  <td className={row.PAcolor}>{row.PA}</td>
                  <td>{row.wins}</td>
                  <td>{row.losses}</td>
                </tr>
              ))
            ) 
            : 
            (<tr></tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default Recap;