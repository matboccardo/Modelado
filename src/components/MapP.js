import React, { useEffect,useMemo } from 'react';
import { getPoints } from '../helpers/helper';
const functionPlot = require("function-plot");

const MapP = ({points, pValue, qValue}) => {
    // puntos que construyen la function de la trayectorias
    const pointsTrajectoryFunction = useMemo(() => getPoints(pValue,qValue) ,[qValue, pValue]);
    const options = useMemo(() => ({
        title: 'Diagrama p vs a',
        yAxis: { domain: [-5, 5] },
        width: 800,
        height: 400,
        grid: true,
        data: [
            {
                fn: pValue,
            },
            {
                points: pointsTrajectoryFunction,
                fnType: 'points',
                graphType: 'polyline',
            },
            {
                points: [0,0],
                fnType: 'points',
                graphType: 'scatter',
            }
        ]
    }),[pointsTrajectoryFunction]);

    useEffect(() => {
        options.target = document.querySelector("#mapp");
        // options.data[2] = {
        //     points: points.length > 0 ? [points] : [0,0],
        //     fnType: 'points',
        //     graphType: 'scatter',
        //     color: 'red',
        //     attr: {
        //         r: 3,
        //     },
        // };
        functionPlot(options);
    },[points,options]);

    return (
        
        <div id="mapp"/>
    );
};

export default MapP;