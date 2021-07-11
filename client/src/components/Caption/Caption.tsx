import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Title = () => {
    const state = useSelector((state: any) => state)

    let caption: string | undefined

    if (state.sleeper.sleeperReport && state.sleeper.sleeperCaption) {
        caption = state.sleeper.sleeperCaption
    } else if (state.espn.espnReport && state.espn.espnCaption) {
        caption = state.espn.espnCaption
    }

    useEffect(() => {
        
        return () => {
            
        }
    },)

    return (<h2 className="reportCaption">{caption}</h2>)
}

export default Title;