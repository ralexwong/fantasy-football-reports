type Props = {
    score: string,
    name: string,
    record: string,
}

const ScoreboardRow = (props: Props) => {
    return (
        <div className="scoreboard__row">
            <p className="scoreboard__scores">{props.score}</p>
            <p className="scoreboard__names">{props.name}</p>
            <p className="scoreboard__record">{props.record}</p>
        </div>
    );
}


export default ScoreboardRow;
