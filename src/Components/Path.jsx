//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisLeft,max} from 'd3';

function Path() {

    const [data,setData] = useState([10,20,30,40,50,10,20,30,40,50]);
    const svgRef = useRef();
    const svgScaleRef = useRef();
    
    useEffect(() => {
        const svg = select(svgRef.current);
        const svgScaled = select(svgScaleRef.current);
        let maxEl = max(data); const leftMargin = 100; const topMargin = 100;

        const lineEl = line()
                        .x((value,i)=>leftMargin*(i+1)+50) //each data point with constant x distance
                        .y((value)=>value)
                        .curve(curveCardinal)
        const pathElements = svg
                        .selectAll('path')
                        .data([data])
                        .enter().append('path')
                        .attr("d",(value,i)=>lineEl(value))
                        .attr("stroke","red")
                        .style("fill","none")

        const textElems = svg.append('g')
                        .selectAll('text')
                        .data(data)
                        .enter().append('text')
                        .text(node => node)
                        .attr('font-size',8)
                        .attr("dx",(value,i)=>leftMargin*(i+1)+45)
                        .attr("dy",(value,i)=>topMargin)
            

        const scaleXEl = scaleLinear()
                        .domain([0,data.length-1])
                        .range([leftMargin+0,1000]); //leftmargin for 1st element
        const scaleYEl = scaleLinear()
                        .domain([0,maxEl])
                        .range([maxEl+100,0])
                        
        
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
        svgScaled.select('.x-axis').style("transform","translateY(150px)").call(xAxis);

        const yAxis = axisLeft(scaleYEl).ticks(data.length).tickFormat((i)=>i)
        svgScaled.select('.y-axis').style("transform","translateX(100px)").call(yAxis);


    }, [])
    

    return (
      <div className="">
          <svg style={{width:'100%',height:'100%',border:'2px solid black'}} ref={svgRef}></svg>
          <svg style={{width:'100%',height:'100%',border:'2px solid black'}} ref={svgScaleRef}>
            
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
      </div>
    );
}

export default Path
