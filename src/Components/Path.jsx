//Path, Axis , Scales
import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,line,curveCardinal,scaleLinear,axisBottom,axisLeft,max,zoom,brushX} from 'd3';
import * as d3 from 'd3';

function Path() {

    const [data,setData] = useState([10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,
        40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,
        40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50,40,50,10,20,30,40,50,10,20,30,40,50,10,20,30,40,50]);
    const svgRef = useRef();
    const width = 500; 
    const height = 300; 
    const [zoomState,setZoomState] = useState(null)
    
    useEffect(() => {
                    
        const svg = select(svgRef.current)
                            .attr("viewBox",`0 0 ${width} ${height}`)
                            .attr("preserveAspectRatio","xMidYMid meet")
                            .style("height",height)
                            .style("width",'100%')
        const svgContent = svg.select('.content')
                    

        let maxEl = max(data);             

        const xScale = scaleLinear()
                        .domain([0,data.length-1])
                        .range([10,width-10]); 
        const yScale = scaleLinear()
                        .domain([0,maxEl])
                        .range([height-5,10])
                        
        
        if(zoomState)
        {
                const newXScale = zoomState.rescaleX(xScale);
                xScale.domain(newXScale.domain());
        }
        
        const lineGenerator = line()
                        .x((value,i)=>xScale(i))
                        .y((value)=>yScale(value))
                        .curve(curveCardinal)
        
        svgContent
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr("class",'line')
            .attr("d",(value,i)=>lineGenerator(value))
            .attr("stroke","red")
            .style("fill","none")
            
        svgContent
            .selectAll(".dot")
            .data(data)
            .join("circle")
                .attr('class','dot')
                .attr("fill", "green")
                .attr("stroke", "none")
                .attr("cx", function(d,i) { return xScale(i) })
                .attr("cy", function(d) { return yScale(d) })
                .attr("r", 3)

            
        const xAxis = axisBottom(xScale).ticks(10);
        svg.select('.x-axis').style("transform",`translateY(${height}px)`).call(xAxis);

        const yAxis = axisLeft(yScale).ticks(10)
        svg.select('.y-axis').style("transform","translateX(0px)").call(yAxis);

        const zoomBehaviour = zoom()
        .scaleExtent([0.5,5])
        .translateExtent([
          [0,0],
          [width,height]
        ])
        .on('zoom',(e)=>{
          let currentZoomState = e.transform;
          setZoomState(currentZoomState);
        
        })

        svg.call(zoomBehaviour)
  
    }, [zoomState,data])
    
  
    return (
      <div >
          <svg  ref={svgRef}>
            <defs>
            <clipPath id="myClip">
                <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
            </defs>
            <g className="content" clipPath={`url(#myClip)`}></g>
            <g className='x-axis' > </g>
            <g className='y-axis'>  </g>
            
          </svg>
      </div>
    );
}

export default Path
