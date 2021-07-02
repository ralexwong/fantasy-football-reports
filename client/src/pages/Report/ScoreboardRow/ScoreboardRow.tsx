type Props = {
    points1: string,
    points2: string,
    roster1: string,
    roster2: string
}

const ScoreboardRow = (props: Props) => {
    return (
        <div className="scoreboard__row">
            <div className="scoreboard__scores">
                <p>{props.points1}</p>

                <p>{props.points2}</p>
            </div>

            <div className="scoreboard__names">
                <p>{props.roster1}</p>

                <p>{props.roster2}</p>
            </div>

            <div className="scoreboard__record">
                <p>{(parseFloat(props.points1) > parseFloat(props.points2)) ? "W" : "L"}</p>

                <p>{(parseFloat(props.points2) > parseFloat(props.points1)) ? "W" : "L"}</p>
            </div>
        </div>
    );
}


export default ScoreboardRow;