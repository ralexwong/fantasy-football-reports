import { useState } from "react";

import { setEspnYear } from '../../actions/Espn';
import { setSleeperYear } from '../../actions/Sleeper';

type Props = {
    platform: string
}

const YearInput = (props: Props) => {

    const [input, setInput] = useState<string>('2021')

    const handleChange = (e: { target: HTMLInputElement }) => {
        setInput(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(input);

        if (props.platform === 'sleeper') {
            setSleeperYear(input);
        } else if (props.platform === 'espn') {
            setEspnYear(input);
        }
    }

    return (
        <div className='input__jumbotron'>
            <div className="input__helpertext">
                <p className="bold">
                    The year will default to the current season's year
                </p>
            </div>
            <form onSubmit={onSubmit} className="espnForm">
                <input
                    className="input__input"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Year" 
                    value={input}
                    type="number"
                    />
                <button type="button" className="btn btn--sleeper">Submit</button>
            </form>
        </div>
    )
}

export default YearInput;
