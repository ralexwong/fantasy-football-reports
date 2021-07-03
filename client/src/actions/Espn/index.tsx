import {
    FETCH_ESPN,
    SET_ESPN_WEEK,
    ESPN_ID,
    ESPN_SCHEDULE,
    ESPN_RECAP,
    ESPN_FIRST_PLACE,
    ESPN_LAST_PLACE,
    SET_ESPN_REPORT,
    SET_SLEEPER_REPORT,
    ESPN_POWER_RANKING,
    SET_ESPN_MATCHUPS,
    SET_ESPN_CLOSE_ONE,
    SET_ESPN_TOP_SCORER,
    SET_ESPN_GRAPH_PPG,
    SET_ESPN_TITLE,
    SET_ESPN_CAPTION,
    SET_ESPN_SEASON,
    SET_ESPN_YEAR,
    RESET_ESPN_WEEK
} from '../types'

import axios from 'axios';
import SvgToPngConverter from '../../components/SvgToPngConverter';

type Place = {
    name: string,
    logo: string,
    original: string,
}

type Recap = {
    abbrev: string,
    PPGcolor: string,
    PFcolor: string,
    PAcolor: string,
    PPG: number,
    PF: number,
    PA: number,
    wins: string,
    losses: string,
    name: string,
    logo: string,
    shorterName: string
}

// grab the espn league info -------------------------------------
export const fetchEspn = (id: string, year: string, oldFirstPlace: Place, oldLastPlace: Place, oldID: string) => async (dispatch: any) => {
    // console.log(id);
    let response;
    try {
        response = await axios.get(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/${year}/segments/0/leagues/${id}?view=mStandings&view=mTeam`);
    } catch (e) {
        dispatch({ type: ESPN_ID, payload: null })
        return
    }

    const data = response.data;
    const teams = data.teams
    const schedule = data.schedule;

    // teams info object for overall report page
    const teamsInfo = [];
    for (let i = 0; i < teams.length; i++) {
        let name = teams[i].location + " " + teams[i].nickname;
        name = name.substring(0,20)
        let shorterName = name.substring(0,10);
        teamsInfo.push({ 
            abbrev: teams[i].abbrev, 
            id: teams[i].id, 
            name: name,
            shorterName: shorterName, 
            logo: teams[i].logo, 
            totalPoints: teams[i].points, 
            pointsAgainst: teams[i].record.overall.pointsAgainst, 
            wins: teams[i].record.overall.wins,
            losses: teams[i].record.overall.losses,
        })
    }

    // console.log(teamsInfo)

    // create the graphPoints object
    let powerRanking = []
    for (let i = 0; i < teamsInfo.length; i++) {

        const winsCalculation = (teamsInfo[i].totalPoints * (teamsInfo[i].wins / (teamsInfo[i].wins + teamsInfo[i].losses)));
        const ppg = parseFloat((teamsInfo[i].totalPoints / ((teamsInfo[i].wins) + (teamsInfo[i].losses))).toFixed(2));
        const score = teamsInfo[i].totalPoints + winsCalculation + ppg

        powerRanking.push({
            label: teamsInfo[i].shorterName,
            y: score
        })
    }

    // sorts the powerRanking by points
    powerRanking.sort(function (a, b) { return b.y - a.y })

    // create the recap object
    let recapInfo: Recap[] = []
    for (let i = 0; i < teamsInfo.length; i++) {
        let abbrev = teamsInfo[i].abbrev;
        let PPG = parseFloat((teamsInfo[i].totalPoints / ((teamsInfo[i].wins) + (teamsInfo[i].losses))).toFixed(2));
        let PF = Math.round(teamsInfo[i].totalPoints);
        let PA = Math.round(teamsInfo[i].pointsAgainst);
        let wins = teamsInfo[i].wins;
        let losses = teamsInfo[i].losses;

        let name = teamsInfo[i].name;
        let logo = teamsInfo[i].logo;
        let shorterName = teamsInfo[i].shorterName;

        recapInfo.push({ 
            abbrev: abbrev,
            PPG: PPG,
            PF: PF,
            PA: PA,
            wins: wins,
            losses: losses,

            name: name,
            logo: logo,
            shorterName: shorterName,

            PPGcolor: '',
            PFcolor: '',
            PAcolor: ''
        })
    }

    // set the colors for the table
    // sorting the league by PPG
    recapInfo.sort((a, b) => (a.PPG < b.PPG) ? 1 : -1);
    for (let i = 0; i < recapInfo.length; i++) {
      recapInfo[i].PPGcolor = `color${(i + 1)}`;
    }

    // sorting the league by PF
    recapInfo.sort((a, b) => (a.PF < b.PF) ? 1 : -1);
    for (let i = 0; i < recapInfo.length; i++) {
      recapInfo[i].PFcolor = `color${(i + 1)}`;
    }

    // sorting the league by PA
    recapInfo.sort((a, b) => (a.PA > b.PA) ? 1 : -1);
    for (let i = 0; i < recapInfo.length; i++) {
      recapInfo[i].PAcolor = `color${(i + 1)}`;
    }

    // sorting the league by wins. If the wins are equal, sort by PF
    recapInfo.sort((a, b) => (a.wins < b.wins) ? 1 : (a.wins === b.wins) ? ((a.PF < b.PF) ? 1 : -1) : -1)

    // console.log(recapInfo)

    // set the first and last place
    let firstPlace = {
        name: recapInfo[0].shorterName,
        logo: recapInfo[0].logo,
        original: recapInfo[0].logo
    }
    let lastPlace = {
        name: recapInfo[recapInfo.length - 1].shorterName,
        logo: recapInfo[recapInfo.length - 1].logo,
        original: recapInfo[recapInfo.length - 1].logo
    }

    // check if the previous logo is the same
    // if its not then go through svg check and conversion
    if (oldFirstPlace.original !== firstPlace.original) {
        const firstPlaceLength = firstPlace.logo.length
        const firstPlaceString = firstPlace.logo.substring(firstPlaceLength-3, firstPlaceLength)
    
        if (firstPlaceString === 'svg') {
            new SvgToPngConverter().convertFromInput(firstPlace.logo, function(imgData: string){
                firstPlace.logo = imgData
            });
        }
    }

    if (oldLastPlace.original !== lastPlace.original) {
        const lastPlaceLength = lastPlace.logo.length
        const lastPlaceString = lastPlace.logo.substring(lastPlaceLength-3, lastPlaceLength)
    
        if (lastPlaceString === 'svg') {
            new SvgToPngConverter().convertFromInput(lastPlace.logo, function(imgData: string){
                lastPlace.logo = imgData
            });
        }
    }

    if (id !== oldID) {
        dispatch({ type: RESET_ESPN_WEEK, payload: null })
    }

    // console.log(firstPlace)

    dispatch({ type: FETCH_ESPN, payload: teamsInfo });
    dispatch({ type: ESPN_SCHEDULE, payload: schedule });
    dispatch({ type: ESPN_RECAP, payload: recapInfo });
    dispatch({ type: ESPN_FIRST_PLACE, payload: firstPlace })
    dispatch({ type: ESPN_LAST_PLACE, payload: lastPlace })
    dispatch({ type: ESPN_POWER_RANKING, payload: powerRanking })
    dispatch({ type: ESPN_ID, payload: id })
}

type Espn = {
    id: string,
    name: string,
    logo: string,
    shorterName: string
}

type Schedule = {
    matchupPeriodId: number,
    away: Location,
    home: Location,
}

type Location = {
    teamId: string,
    logo: string,
    shorterName: string,
    totalPoints: string
}

type TopScorer = {
    name: string,
    score: number,
    logo: string,
    original: string
}

type CloseOne = {
    name: string,
    difference: number | string,
    logo: string,
    original: string
}

type Matchups = {
    roster1: string,
    points1: number,
    logo1: string,
    shorterName1: string,

    roster2: string,
    points2: number,
    logo2: string,
    shorterName2: string
}

// setting the espn week --------------------------------------------------------
export const setEspnWeek = (week: number, espn: Espn[], espnSchedule: Schedule[], oldTopScorer: TopScorer, oldCloseOne: CloseOne) => async (dispatch: any) => {

    // console.log(espn);
    // console.log(espnSchedule);

    let topScorer: TopScorer = {
        name: "bob",
        score: 0,
        logo: "",
        original : ''
    }
    let closeOne: CloseOne = {
        name: "bob",
        difference: Infinity,
        logo: "",
        original : ''
    }
    let matchups: Matchups[] = [];
    let graphPPG = [];
    let length = espn.length / 2;

    for (let i = (week - 1) * length; i < espnSchedule.length; i++) {
        if (espnSchedule[i].matchupPeriodId !== week) {
            break
        }

        for (let j = 0; j < espn.length; j++) {
            if (espn[j].id === espnSchedule[i].away.teamId) {
                espnSchedule[i].away.teamId = espn[j].name;
                espnSchedule[i].away.logo = espn[j].logo;
                espnSchedule[i].away.shorterName = espn[j].shorterName;
            }
            if (espn[j].id === espnSchedule[i].home.teamId) {
                espnSchedule[i].home.teamId = espn[j].name;
                espnSchedule[i].home.logo = espn[j].logo;
                espnSchedule[i].home.shorterName = espn[j].shorterName;
            }
        }

        matchups.push({
            roster1: espnSchedule[i].away.teamId,
            points1: parseFloat(espnSchedule[i].away.totalPoints),
            logo1: espnSchedule[i].away.logo,
            shorterName1: espnSchedule[i].away.shorterName,

            roster2: espnSchedule[i].home.teamId,
            points2: parseFloat(espnSchedule[i].home.totalPoints),
            logo2: espnSchedule[i].home.logo,
            shorterName2: espnSchedule[i].home.shorterName
        })
    }

    for (let i = 0; i < matchups.length; i++) {
        if (matchups[i].points1 > matchups[i].points2) {
          graphPPG.push({ label: matchups[i].shorterName1, y: matchups[i].points1, color: "#00006b" });
          graphPPG.push({ label: matchups[i].shorterName2, y: matchups[i].points2, color: "#b61e1e" });
        } else {
          graphPPG.push({ label: matchups[i].shorterName1, y: matchups[i].points1, color: "#b61e1e" });
          graphPPG.push({ label: matchups[i].shorterName2, y: matchups[i].points2, color: "#00006b" });
        }
    }

    // sorts the graphPPG by points
    graphPPG.sort(function (a, b) { return b.y - a.y })


    for (let k = 0; k < matchups.length; k++) {
        if (matchups[k].points1 > topScorer.score) {
            topScorer.score = matchups[k].points1;
            topScorer.name = matchups[k].roster1;
            topScorer.logo = matchups[k].logo1;
            topScorer.original = matchups[k].logo1;
        }

        if (matchups[k].points2 > topScorer.score) {
            topScorer.score = matchups[k].points2;
            topScorer.name = matchups[k].roster2;
            topScorer.logo = matchups[k].logo2;
            topScorer.original = matchups[k].logo2;
        }

        if (Math.abs(matchups[k].points1 - matchups[k].points2) < closeOne.difference) {
            closeOne.difference = Math.abs(matchups[k].points1 - matchups[k].points2).toFixed(2);
            if (matchups[k].points1 > matchups[k].points2) {
              closeOne.name = matchups[k].roster1;
              closeOne.logo = matchups[k].logo1;
              closeOne.original = matchups[k].logo1;
            } else {
              closeOne.name = matchups[k].roster2;
              closeOne.logo = matchups[k].logo2;
              closeOne.original = matchups[k].logo2;
            }
        }
    }

    // check if the previous logo is the same
    // if its not then go through svg check and conversion
    if (oldTopScorer.original !== topScorer.original) {
        const topScorerLength = topScorer.logo.length
        const topScorerString = topScorer.logo.substring(topScorerLength-3, topScorerLength)
    
        if (topScorerString === 'svg') {
            new SvgToPngConverter().convertFromInput(topScorer.logo, function(imgData: string){
                topScorer.logo = imgData
            });
        }
    }

    if (oldCloseOne.original !== closeOne.original) {
        const closeOneLength = closeOne.logo.length
        const closeOneString = closeOne.logo.substring(closeOneLength-3, closeOneLength)

        if (closeOneString === 'svg') {
            // console.log('hit')
            new SvgToPngConverter().convertFromInput(closeOne.logo, function(imgData: string){
                closeOne.logo = imgData
            });
        }
    }

    // console.log(matchups)

    dispatch({ type: SET_ESPN_GRAPH_PPG, payload: graphPPG })
    dispatch({ type: SET_ESPN_CLOSE_ONE, payload: closeOne })
    dispatch({ type: SET_ESPN_TOP_SCORER, payload: topScorer })
    dispatch({ type: SET_ESPN_MATCHUPS, payload: matchups })
    dispatch({ type: SET_ESPN_WEEK, payload: week })
}

// creating the espn report --------------------------------------------
export const createEspnWeeklyReport = () => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_REPORT, payload: true })
    dispatch({ type: SET_SLEEPER_REPORT, payload: false })
}
export const createEspnOverallReport = () => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_REPORT, payload: true })
    dispatch({ type: SET_SLEEPER_REPORT, payload: false })
}

// setting the espn title ----------------------------------------------
export const setEspnTitle = (data: string) => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_TITLE, payload: data })
}

// setting the espn caption ---------------------------------------------
export const setEspnCaption = (data: string) => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_CAPTION, payload: data })
}

// setting the espn season --------------------------------------------------
export const setEspnSeason = (data: string) => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_SEASON, payload: data })
}

// setting the espn year -----------------------------------------------
export const setEspnYear = (data: string) => async (dispatch: any)=> {
    dispatch({ type: SET_ESPN_YEAR, payload: data })
}
