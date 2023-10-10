//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisLeft,max,scaleBand} from 'd3';

function Scales() {

    const [data,setData] = useState([10,20,30,40,50,10,70,60,80,50]);
    const svgRef = useRef();
    
    useEffect(() => {
       
        const width = 500; const offsetX = 0;
        const height = 300; const offsetY = 0;
        const textYOffset = 10;
        
        
        const svg = select(svgRef.current)
                            .attr("viewBox",`0 0 ${width} ${height}`)
                            .attr("preserveAspectRatio","xMidYMid meet")
                            .style("height",height)
                            .style("width",'100%')

        let maxEl = max(data); 
        
        
        const xScale = scaleBand()
                        .domain(data.map((value,index)=>index)) //We need all the data points to be on xAxis
                        .range([0,width])
                        .padding(0.5); 

        const yScale = scaleLinear()
                        .domain([0,maxEl])
                        .range([height,0]);

        const colorScale = scaleLinear()
            .domain([0,maxEl/2,maxEl])
            .range(["red","orange","green"])
            
        const xAxis = axisBottom(xScale).ticks(data.length);
        svg.select('.x-axis').style("transform",`translateY(${height}px)`).call(xAxis);

        const yAxis = axisLeft(yScale).ticks(10)
        svg.select('.y-axis').style("transform","translateX(0px)").call(yAxis);

    }, [data])
    

    return (
      <div className="">
          <svg  ref={svgRef}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
      </div>
    );
}

export default Scales
