
import { useSelector } from 'react-redux';

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

    
    return (
        <div className="cardsContainer">
            <div>
                <p className="reportTitle">FIRST PLACE</p>

                <div className='cards'>
                    <div className='cards__outerBox'>
                        <div className='cards__innerBox'>
                            <img
                                crossOrigin="anonymous"
                                referrerPolicy="origin"
                                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.setAttribute("src", "./images/nfl-logo.jpg")}
                                src={firstPlace}
                                alt="poop"
                                className="cards__image" />
                        </div>
                    </div>
                    <div className='cards__lowerBox'>
                        <p className="cards__name">{firstPlaceName}</p>
                    </div>
                </div>
            </div>

            <div>
                <p className="reportTitle">LAST PLACE</p>

                <div className='cards'>
                    <div className='cards__outerBox'>
                        <div className='cards__innerBox'>
                            <img
                                crossOrigin="anonymous"
                                referrerPolicy="origin"
                                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.setAttribute("src", "./images/nfl-logo.jpg")}
                                src={lastPlace}
                                alt="poop"
                                className="cards__image" />
                        </div>
                    </div>
                    <div className='cards__lowerBox'>
                        <p className="cards__name">{lastPlaceName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;