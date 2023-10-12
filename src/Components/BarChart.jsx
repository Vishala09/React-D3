//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisLeft,max,scaleBand} from 'd3';

function BarChart() {

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

        svg.selectAll('.bar')
                .data(data)
                .join("rect")
                .attr("class","bar")
                .style("transform","scale(1,-1)")
                .attr("x",(value,index)=> xScale(index))
                .attr("y",(value,index)=> -height) //yScale(value) =>without transition
                .attr("width",xScale.bandwidth())
                .on("mouseenter",(event,value)=>{
                    const index = svg.selectAll(".bar").nodes().indexOf(event.target);
        
                    svg
                        .selectAll(".tooltip")
                        .data([value])
                        .join((enter) => enter.append("text").attr("y", yScale(value) - textYOffset/2)) //bottom to top transition
                        .attr("class","tooltip")
                        .text(value)
                        .attr("x",xScale(index)+xScale.bandwidth()/2)
                        .attr("text-anchor","middle")
                        .transition()
                        .attr("y",yScale(value)-textYOffset)
                        .attr("opacity",1)
                })
                .on("mouseleave",()=>svg.select(".tooltip").remove())
                .transition()
                .attr("fill",colorScale)
                .attr('height',(value)=>height-yScale(value))
                

    }, [data])
    

    return (
      <div className="">
          <svg  ref={svgRef}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
          <br></br>
          <button onClick={()=>{
             let dataTemp = [];
             dataTemp = data.map((d)=>d+20);
             setData(dataTemp)
          }}>Update</button>
          <button onClick={()=>{
             let dataTemp = [];
             dataTemp = data.filter((d)=>d>50)
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

export default BarChart
