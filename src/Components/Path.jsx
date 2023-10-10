//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisLeft,max} from 'd3';

function Path() {

    const [data,setData] = useState([10,20,30,40,50,10,20,30,40,50]);
    const svgRef = useRef();
    const svgScaleRef = useRef();
    const leftMargin = 50; const topMargin = 100;
    const width = 500; 
    const height = 300; 
    
    useEffect(() => {
        const svg = select(svgRef.current)
                    .attr("viewBox",`0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .style("height",height)
                    .style("width",'100%')
                    .append('g')
        const svgScaled = select(svgScaleRef.current)
                    .attr("viewBox",`0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .style("height",height)
                    .style("width",'100%')

        let maxEl = max(data); 

        const lineEl = line()
                        .x((value,i)=>i==0?0:leftMargin*(i+1)) //each data point with constant x distance
                        .y((value)=>value)
                        .curve(curveCardinal)
        const pathElements = svg
                        .selectAll('path')
                        .data([data])
                        .enter().append('path')
                        .attr("d",(value,i)=>lineEl(value))
                        .attr("stroke","red")
                        .style("fill","none")

        const textElems = svg
                        .selectAll('text')
                        .data(data)
                        .enter().append('text')
                        .text(node => node)
                        .attr('font-size',8)
                        .attr("dx",(value,i)=>i==0?0:leftMargin*(i+1))
                        .attr("dy",(value,i)=>topMargin)
            

        const scaleXEl = scaleLinear()
                        .domain([0,data.length-1])
                        .range([0,width]); 
        const scaleYEl = scaleLinear()
                        .domain([0,maxEl])
                        .range([height,0])
                        
        
        const lineElScaled = line()
                        .x((value,i)=>scaleXEl(i))
                        .y((value)=>scaleYEl(value))
                        //.curve(curveCardinal)
        
        const pathElementsScaled = svgScaled
            .selectAll('path')
            .data([data])
            .enter().append('path')
            .attr("d",(value,i)=>lineElScaled(value))
            .attr("stroke","red")
            .style("fill","none")
        
        svgScaled
            .selectAll("circle")
            .data(data)
            .enter().append("circle")
                .attr("fill", "green")
                .attr("stroke", "none")
                .attr("cx", function(d,i) { return scaleXEl(i) })
                .attr("cy", function(d) { return scaleYEl(d) })
                .attr("r", 3)
            
        const xAxis = axisBottom(scaleXEl).ticks(data.length).tickFormat((i)=>i).tickPadding(5);
        svgScaled.select('.x-axis').style("transform",`translateY(${height}px)`).call(xAxis);

        const yAxis = axisLeft(scaleYEl).ticks(data.length).tickFormat((i)=>i)
        svgScaled.select('.y-axis').style("transform","translateX(0px)").call(yAxis);


    }, [])
    

    return (
      <div >
          <svg  ref={svgRef}></svg>
          <svg  ref={svgScaleRef}>
            
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
      </div>
    );
}

export default Path
