import * as React from "react";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { exportComponentAsPNG } from "react-component-export-image";
import { createSleeperWeeklyReport } from '../../actions/Sleeper';
import Report from "./Report"

const ComponentToPrint = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <div className="reportContainer" ref={ref} tabIndex={0}>
      <Report />
    </div>
    )
})

const SleeperWeeklyReport = () => {
  const componentRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  dispatch(createSleeperWeeklyReport())

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn--sleeper u-margin-top" onClick={() => exportComponentAsPNG(componentRef)}>
          Click here to download your report as an image!
        </button>
      </div>
      
      <ComponentToPrint ref={componentRef} />
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <Link to="/overall-report-sleeper">
        <button className="btn btn--sleeper">
          Click here for the overall report!
        </button>
      </Link>
      </div>
    </>
  )
}

export default SleeperWeeklyReport;
