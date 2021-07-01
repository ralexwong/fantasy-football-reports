import { useState } from "react";
import { Link } from "react-router-dom";

type Item = {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    name: string,
    link: string
}

const DesktopNav: React.FC<{}> = () => {
    const [sleeperOpen, setSleeperOpen] = useState<boolean>(false);
    const [espnOpen, setEspnOpen] = useState<boolean>(false);

    const list: Array<Item> = [
        {
            state: sleeperOpen,
            setState: setSleeperOpen,
            name: 'Sleeper',
            link: 'sleeper',
        },
        {
            state: espnOpen,
            setState: setEspnOpen,
            name: 'ESPN',
            link: 'espn',
        }
    ]
    return (
        <ul className='nav__list' tabIndex={0}>
            <li className='nav__item' tabIndex={1}>
                <Link className="nav__word" to="/">
                    Home
                </Link>
            </li>

            {list.map(item => {
                return <li key={item.name} className={`nav__item ${item.state === true ? "nav__item--active" : ""}`}
                onClick={() => item.setState(true)}
                onMouseLeave={() => item.setState(false)}
                onKeyPress={() => item.setState(true)}
                tabIndex={0}
            >
                <p className="nav__word">
                    {item.name}
                </p>

                {item.state ?
                    <ul className='nav__dropdown'>
                        <li 
                            onClick={() => item.setState(false)}
                            onKeyPress={() => item.setState(false)}
                        >
                            <Link className='nav__dropdown__item' to={`/weekly-report-${item.link}`}>
                                Weekly Report
                            </Link>
                        </li>
                        <li 
                            onClick={() => item.setState(false)}
                            onKeyPress={() => item.setState(false)}
                        >
                            <Link className='nav__dropdown__item' to={`/overall-report-${item.link}`}>
                                Overall Report
                            </Link>
                        </li>

                        <li 
                            onClick={() => item.setState(false)}
                            onKeyPress={() => item.setState(false)}
                        >
                            <Link className='nav__dropdown__item' to={`/${item.link}`}>
                                Input
                            </Link>
                        </li>

                    </ul> : <></>
                }
            </li> 
            })}
            
        </ul>
    );
};

export default DesktopNav;
