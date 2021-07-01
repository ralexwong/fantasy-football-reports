import { useState } from 'react';
import { setEspnSeason, setEspnTitle, setEspnCaption } from '../../actions/Espn';
import { setSleeperSeason, setSleeperTitle, setSleeperCaption } from '../../actions/Sleeper';

type Props = {
    platform: string,
    input: string,
    open: boolean
}

const OptionalInput = (props: Props) => {
    const [input, setInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: { target: HTMLInputElement; }) => {
        let regex: RegExp = /^[A-Za-z0-9 ]+$/;

        if (e.target.value === '') {
            setInput('');
            return
        }

        let isValid: boolean = regex.test(e.target.value);
        if (isValid) {
            let maxLength: number | undefined;

            if (props.input === 'Season') {
                maxLength = 2
            } else if (props.input === 'Caption') {
                maxLength = 100
            } else if (props.input === 'Title') {
                maxLength = 30
            }

            const message: string = e.target.value.slice(0, maxLength);
            setInput(message);
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onLoading();
        console.log(input);

        if (props.platform === 'sleeper') {
            if (props.input === 'Season') {
                setSleeperSeason(input);
            } else if (props.input === 'Caption') {
                setSleeperCaption(input)
            } else if (props.input === 'Title') {
                setSleeperTitle(input)
            }
        } else if (props.platform === 'espn') {
            if (props.input === 'Season') {
                setEspnSeason(input);
            } else if (props.input === 'Caption') {
                setEspnCaption(input)
            } else if (props.input === 'Title') {
                setEspnTitle(input)
            }
        }
    }

    const onLoading = () => {
        setLoading(true);
        setTimeout(() => { 
            setLoading(false)
        }, 
        1500);
    }


    return (
        <div className={props.open === true ? 'accordian__form--open' : 'accordian__form--close'}>
            <form onSubmit={onSubmit}>
                <div className='input__container'>
                    <label className='input__label' htmlFor={`${props.platform}${props.input}`}>Week</label>
                    <input
                        id={`${props.platform}${props.input}`}
                        name={`${props.platform}${props.input}`}
                        className="input__input"
                        onChange={handleChange}
                        autoComplete="off"
                        value={input}
                    />
                </div>
                <p className='input__helpertext'></p>

                {loading ? (
                    <button className={`btn btn--${props.platform === 'sleeper' ? 'sleeper' : 'espn'}`} type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                    </button>
                ) : (
                    <button type="button" className={`btn btn--${props.platform === 'sleeper' ? 'sleeper' : 'espn'}`}>Submit</button>
                )}

            </form>
        </div>
    )

}

export default OptionalInput;
