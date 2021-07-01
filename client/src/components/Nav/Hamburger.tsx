import { useState } from "react";
import { Link } from "react-router-dom";

const Hamburger = () => {
    const [hamburgerMenuActive, setHamburgerMenuActive] = useState<boolean>(false);
    const [sidebarContent, setSidebarContent] = useState<string>('main')
    const [open, setOpen] = useState<boolean>(true)

    const list: string[] = ['sleeper', 'espn']

    const stopScroll = () => {
        setHamburgerMenuActive(!hamburgerMenuActive)
        if (open) {
            document.body.style.overflow = 'hidden';
            setOpen(false)
        } else {
            document.body.style.overflow = 'unset';
            setOpen(true)
        }
    }

    return (
        <>
            <div className={`nav__hamburger ${hamburgerMenuActive ? "nav__hamburger--active" : ""}`}
                onClick={() => stopScroll()}
            ></div>
            <div className={hamburgerMenuActive ? "nav__overlay" : ""}></div>
            <button
                className={hamburgerMenuActive ? "nav__overlay__exit" : ""}
                onClick={() => stopScroll()}
            ></button>
            <div className={`sidebarNav ${hamburgerMenuActive ? "sidebarNav--active" : ""}`}>
                <ul className={`sidebarNav__content ${sidebarContent === 'main' ? '' : 'sidebarNav__content--off'}`}>
                    <li>
                        <Link className="bold-underline sidebarNav__link" to="/" onClick={() => stopScroll()}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <button className={`sidebarNav__link ${sidebarContent === 'sleeper' ? 'sidebarNav__link--active' : ''}`} onClick={() => setSidebarContent('sleeper')}>
                            Sleeper <span className='sidebarNav__arrow'>&#8250;</span>
                        </button>
                    </li>
                    <li>
                        <button className={`sidebarNav__link ${sidebarContent === 'espn' ? 'sidebarNav__link--active' : ''}`} onClick={() => setSidebarContent('espn')}>
                            ESPN <span className='sidebarNav__arrow'>&#8250;</span>
                        </button>
                    </li>
                </ul>
                {list.map(item => {
                    return <ul className={`sidebarNav__content ${sidebarContent === item ? '' : 'sidebarNav__content--off'}`}>
                        <li>
                            <button className='bold-underline' onClick={() => setSidebarContent('main')}>&#8592; Back</button>
                        </li>
                        <li>
                            <Link to={`/weekly-report-${item}`} onClick={() => stopScroll()}>
                                Weekly Report
                            </Link>
                        </li>
                        <li>
                            <Link to={`/overall-report-${item}`} onClick={() => stopScroll()}>
                                Overall Report
                            </Link>
                        </li>
                        <li>
                            <Link to={`/${item}`} onClick={() => stopScroll()}>
                                Input
                            </Link>
                        </li>
                    </ul>
                })}
            </div>
        </>
    );
};

export default Hamburger;