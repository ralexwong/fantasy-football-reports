
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../../components/Card';

type Profile = {
    name: string,
    score?: number,
    difference?: number,
    logo: string,
}

const Standouts = () => {
    const state = useSelector((state: any) => state)

    let topScorer: Profile = {
        name: "",
        score: 0,
        logo: "",
    }

    let closeOne: Profile = {
        name: "",
        difference: 0,
        logo: "",
    }


    if (state.espn.espnReport && state.espn.espnTopScorer) {
        topScorer = state.espn.espnTopScorer;
        closeOne = state.espn.espnCloseOne;
    } else if (state.sleeper.sleeperReport && state.sleeper.sleeperTopScorer) {
        topScorer = state.sleeper.sleeperTopScorer;
        closeOne = state.sleeper.sleeperCloseOne;
    }

    const lowerbox = (content: ReactNode) => {
        return <>
            {content}
        </>
    }



    return (
        <div className="cardsContainer">
            <Card title='TOP SCORER' src={topScorer.logo} lowerbox={lowerbox(<>{topScorer.name}:<br />{topScorer.score}</>)} />
            <Card title='CLOSE ONE' src={closeOne.logo} lowerbox={lowerbox(<>{closeOne.name}:<br></br>+{closeOne.difference}</>)} />
        </div>
    )
}

export default Standouts;
