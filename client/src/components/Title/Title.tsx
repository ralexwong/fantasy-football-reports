import * as React from 'react'
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Title = () => {
    const state = useSelector((state: any) => state)

    let title: string | undefined

    if (state.sleeper.sleeperReport && state.sleeper.sleeperTitle) {
        title = state.sleeper.sleeperTitle
    } else if (state.espn.espnReport && state.espn.espnTitle) {
        title = state.espn.espnTitle
    }

    return (<h1 className="reportTitle reportTitle__header">{title}</h1>)
}

export default Title;