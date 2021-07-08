import * as React from "react";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { exportComponentAsPNG } from "react-component-export-image";
import { createEspnWeeklyReport } from '../../actions/Espn';
import Report from "./Report"

const ComponentToPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="reportContainer" ref={ref} tabIndex={0}>
      <Report />
    </div>
  )
})

const EspnWeeklyReport = () => {
  const componentRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  dispatch(createEspnWeeklyReport())
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn--espn u-margin-top" onClick={() => exportComponentAsPNG(componentRef)}>
          Click here to download your report as an image!
        </button>
      </div>
      <ComponentToPrint ref={componentRef} />
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Link to="/overall-report-espn">
          <button className="btn btn--espn">
            Click here for the overall report!
          </button>
        </Link>
      </div>
    </>
  )
}

export default EspnWeeklyReport;
