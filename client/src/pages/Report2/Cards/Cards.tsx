import { useSelector } from 'react-redux';

import Card from '../../../components/Card'

const Cards = () => {
    const state = useSelector((state: any) => state)

    let firstPlace: string = ""
    let firstPlaceName: string = "Player 1";
    if (state.espn.espnFirstPlace && state.espn.espnReport) {
        firstPlace = state.espn.espnFirstPlace.logo
        firstPlaceName = state.espn.espnFirstPlace.name
    } else if (state.sleeper.sleeperFirstPlace && state.sleeper.sleeperReport) {
        firstPlace = `http://sleepercdn.com/avatars/${state.sleeper.sleeperFirstPlace.logo}`;
        firstPlaceName = state.sleeper.sleeperFirstPlace.name
    }

    let lastPlace: string = ""
    let lastPlaceName: string = "Player 2";
    if (state.espn.espnLastPlace && state.espn.espnReport) {
        lastPlace = state.espn.espnLastPlace.logo
        lastPlaceName = state.espn.espnLastPlace.name;
    } else if (state.sleeper.sleeperLastPlace && state.sleeper.sleeperReport) {
        lastPlace = `http://sleepercdn.com/avatars/${state.sleeper.sleeperLastPlace.logo}`;
        lastPlaceName = state.sleeper.sleeperLastPlace.name;
    }

    const lowerbox = (content: any) => {
        return <>{content}</>
    }
    
    return (
        <div className="cardsContainer">
            <Card title='FIRST PLACE' src={firstPlace} lowerbox={lowerbox(firstPlaceName)} />
            <Card title='FIRST PLACE' src={lastPlace} lowerbox={lowerbox(lastPlaceName)} />
        </div>
    )
}

export default Cards;