
import { useSelector } from 'react-redux';

const DateRow = () => {

    const state = useSelector((state: any) => state)
    console.log(state)

    const grabDate = () => {
        const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let today: Date = new Date();
        const day: string = `${days[today.getDay()]}`;
        const monthDate: string = `${months[today.getMonth()]}`
        const dayDate: number = today.getDate();
        const year: number = today.getFullYear();

        const date: string = `${day}, ${monthDate} ${dayDate}, ${year}`;
        return date;
    }

    let week: string | undefined;
    let season: number = 1; 

    if (state.espn.espnReport) {
        week = state.espn.espnWeek
    } else if (state.sleeper.sleeperReport) {
        week = state.sleeper.sleeperWeek;
    }

    if (state.espn.espnReport && state.espn.espnSeason) {
        season = state.espn.espnSeason
    } else if (state.sleeper.sleeperReport && state.sleeper.sleeperSeason) {
        season = state.sleeper.sleeperSeason
    }

    return (
        <div className="dateRow">
            <p>{grabDate()}</p>
            <p>Season {season} | Week {week}</p>
        </div>
    );
}

export default DateRow;