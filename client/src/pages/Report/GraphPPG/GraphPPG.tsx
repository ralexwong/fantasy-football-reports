import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CanvasJSReact from '../../../canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Options = {
  animationEnabled: boolean,
    theme: string,
    title: {
      text: string
    },
    axisX: {
      labelFontSize: number,
      labelAngle: number,
      margin: number,
    },
    data: [{
      type: string,
      indexLabel?: string,
      indexLabelFontColor: string,
      indexLabelPlacement: string,
      dataPoints: number[]
    }]
}

const GraphPPG = () => {
  const [width, setWidth] = useState<number>(0)

  const state = useSelector((state: any) => state)

  useEffect(() => {
      updateWindowDimensions()
      window.addEventListener("resize", updateWindowDimensions)

      return () => {
          window.removeEventListener("resize", updateWindowDimensions);
      }
  }, [])

  const updateWindowDimensions = () => {
      setWidth(window.innerWidth);
  };

  let font_size: number = 0
  if (width < 575) {
    font_size = 6.9
  } else {
    font_size = 12
  }

  let graphPPG: number[] = []

  if (state.espn.espnReport) {
    graphPPG = state.espn.espnGraphPPG
  } else if (state.sleeper.sleeperReport) {
    graphPPG = state.sleeper.sleeperGraphPPG
  } 

  const options: Options = {
    animationEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    title: {
      text: "Points for the Week",
    },

    axisX: {
      labelFontSize: font_size,
      labelAngle: -30,
      margin: 30
    },
    data: [{
      type: "column", //change type to bar, line, area, pie, etc
      //indexLabel: "{y}", //Shows y value on all Data Points
      indexLabelFontColor: "black",
      indexLabelPlacement: "outside",
      dataPoints: graphPPG
    }]
  }

  return (
      <div className="pointsGraph">
        <CanvasJSChart options={options}
        // onRef={ref => this.chart = ref}
        />
      </div>
  );
}

export default GraphPPG;




