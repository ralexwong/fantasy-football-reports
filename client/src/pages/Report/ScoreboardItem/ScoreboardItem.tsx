import ScoreboardRow from '../ScoreboardRow';

type Props = {
    points1: string,
    points2: string,
    roster1: string,
    roster2: string
}

const ScoreboardItem = (props: Props) => {
    return (
        <li className="scoreboard__item">
            <ScoreboardRow score={props.points1} name={props.roster1} record={(parseFloat(props.points1) > parseFloat(props.points2)) ? "W" : "L"} />
            <ScoreboardRow score={props.points2} name={props.roster2} record={(parseFloat(props.points2) > parseFloat(props.points1)) ? "W" : "L"} />
        </li>
    );
}


export default ScoreboardItem;