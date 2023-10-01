//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,scaleOrdinal,scaleLinear,axisBottom,axisLeft,max,scaleBand,pie,arc,schemeDark2} from 'd3';
import * as d3 from 'd3';
function DonutChart() {

    const [data,setData] = useState([10,20,30,40,50,10,20,30,40,50]);
    const svgScaleRef = useRef();
    
    useEffect(() => {
       
        const width = 500; const offsetX = 0;
        const height = 300; const offsetY = 0;
        const textYOffset = 10;
        let inR = 75;
        let outR = 150;
        let labelRadius = (inR * 0.2 + outR * 0.8)
        const svg = select(svgScaleRef.current)
                    .attr("viewBox",`0 0 ${width} ${height}`)
                    .attr("preserveAspectRatio","xMidYMid meet")
                    .style("height",height)
                    .style("width",'100%')
                    .append("g")

        var color = scaleOrdinal()
                        .domain(data)
                        .range(schemeDark2);
                    // .domain(data)
                    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

        const arcGenerator = arc()
                                .innerRadius(inR)
                                .outerRadius(outR)
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
        
        const pieGenerator = pie().startAngle(-90 * Math.PI/180)
        .endAngle(-90 * Math.PI/180 + 2*Math.PI)
        .value(function(d) { return d; })
        .padAngle(.01)
        .sort(null);
        const instructions = pieGenerator(data);
    
        const paths = svg
            .selectAll('path')
            .data(instructions)
            .join('path')
            .style( "transform", `translate(${width / 2}px, ${height/2}px)`)
            .attr('d', arcGenerator)
            .attr('fill', function(d,i){ return(color(i)) })
            .attr("stroke", "white")
            .style("stroke-width", "2px")

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(instructions)
            .join("text")
            .style( "transform",d=> `translate(${width / 2 + arcLabel.centroid(d)[0]}px, ${height/2 + arcLabel.centroid(d)[1]}px)`)
            .selectAll("tspan")
            .data(d => {
                const lines = `${(d.data)}`.split(/\n/);
                return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
            })
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d);

    }, [data])
    

    return (
      <div className="">
          <svg  ref={svgScaleRef}>
           
          </svg>
          <br></br>
          <button onClick={()=>{
             let dataTemp = [];
             dataTemp = data.map((d)=>d+20);
             setData(dataTemp)
          }}>Update</button>
          <button onClick={()=>{
             let dataTemp = [];
             dataTemp = data.filter((d)=>d>50);
             setData(dataTemp)
          }}>Filter</button>
          <button onClick={()=>{
             let dataTemp = [...data];
             dataTemp.push(Math.round(Math.random() * 100));
             setData(dataTemp)
          }}>Add</button>
      </div>
    );
}

export default DonutChart
