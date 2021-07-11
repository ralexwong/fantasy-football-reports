import * as React from "react";
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { exportComponentAsPNG } from "react-component-export-image";
import { createSleeperWeeklyReport } from './actions/Sleeper';
import { createEspnWeeklyReport } from './actions/Espn';
import Report from "./pages/Report/Report";
import Report2 from './pages/Report2/Report2';

interface FancyButtonProps {
  type: string; // my custom prop
}

const ComponentToPrint = React.forwardRef<HTMLInputElement, FancyButtonProps>((props, ref) => {
  return (
    <div className="reportContainer" ref={ref} tabIndex={0}>
      {props.type === 'weekly' ? (<Report />) : (<Report2 />)}
    </div>
    )
})

type Props = {
  props?: any
  platform: string,
  type: string,
  other: string
}

const ReportContainer = (props: Props) => {
  console.log('change url')
  console.log(props)
  const componentRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.platform === 'sleeper') {
      dispatch(createSleeperWeeklyReport()) 
    } else {
      dispatch(createEspnWeeklyReport())
    }
    return () => {
      
    }
  }, )

  

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button className={`btn btn--${props.platform} u-margin-top`} onClick={() => exportComponentAsPNG(componentRef)}>
          Click here to download your report as an image!
        </button>
      </div>
      
      <ComponentToPrint ref={componentRef} type={props.type} />
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <Link to={`/${props.other}-report-${props.platform}`}>
        <button className={`btn btn--${props.platform}`}>
          Click here for the {props.other} report!
        </button>
      </Link>
      </div>
    </>
  )
}

export default ReportContainer;
