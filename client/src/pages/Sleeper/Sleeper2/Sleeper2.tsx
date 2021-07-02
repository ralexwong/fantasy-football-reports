import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setLeague_id, fetchLeagueInfo } from '../../../actions/Sleeper';

type Leagues = {
    league_id: string,
    name: string
}

const Sleeper2 = () => {

    const [active, setActive] = useState<string>('');
    const state = useSelector((state: any) => state)
    const dispatch = useDispatch();

    const onClick = (e: any) => {
        // console.log(e.target.getAttribute('id'));
        const league: string = e.target.id;

        if (active === league) { 
            setActive('');
        } else {
            setActive(league)
       }

        localStorage.setItem("league", league);
        dispatch(setLeague_id(league));
        dispatch(fetchLeagueInfo(league));
    }

    const mapLeagues = (leagues: Leagues[]) => {
        return leagues.map(league => {
            return (
                <p className={`input__list ${active === league.league_id ? `input__list--active` : ``}`} id={league.league_id} key={league.league_id} onClick={onClick}>
                    {league.name} {active === league.league_id ? <span aria-label='green-checkmark' role='img'>✔️</span> : ''}
                </p>
            )
        })
    }

    return (
        <div className="input__jumbotron" ref={state.sleeper.reference}>
            <div className="input__helpertext">
                <p className="bold">
                    Click on one league!
                </p>
                {state.sleeper.leagues ? (
                    mapLeagues(state.sleeper.leagues)
                ) : (
                        <p className="paragraph">No Leagues Found</p>
                    )}
            </div>

        </div>
    )
}

export default Sleeper2;