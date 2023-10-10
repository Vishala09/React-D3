import React from 'react'
import { useEffect,useState , useRef } from 'react';
import { scaleBand, scaleLinear, select , max , axisBottom , axisLeft } from 'd3';

function RacingChart() {

    const [data,setData] = useState([10,20,30,40,50,10,20,30,40,50]);
    const svgRef = useRef();

    useEffect(()=>{

        const width = 500; 
        const height = 300; 

        const textOffsetX = 10;
        const textYOffset = 15;
        let maxEl = max(data); 

      const svg = select(svgRef.current)
        .attr("viewBox",`0 0 ${width} ${height}`)
        .attr("preserveAspectRatio","xMidYMid meet")
        .style("height",height)
        .style("width",'100%')

        const yScale = scaleBand()
            .domain(data.map((value,index)=>index))  //0,1,2,3,4...
            .range([height,0])
            .padding(0.1)

        const xScale = scaleLinear()
            .domain([0,maxEl])
            .range([0,width])

        const colorScale = scaleLinear()
            .domain([0,maxEl/2,maxEl])
            .range(["red","orange","green"])
            
        const xAxis = axisBottom(xScale);
        svg.select('.x-axis').style("transform",`translateY(${height}px)`).call(xAxis);

        const yAxis = axisLeft(yScale).ticks(data.length)
        svg.select('.y-axis').style("transform","translateX(0px)").call(yAxis);

        svg
            //.append('g')
            .selectAll('.bar')
            .data(data)
            .join("rect")
            .attr("class","bar")
            .attr("x",0) //From where it starts on x axis
            .attr("y",(value,index)=>yScale(index))
            .attr("fill",colorScale)
            .attr("height",yScale.bandwidth())
            //.transition()
            .attr("width",(value)=>xScale(value))

        svg
            //.append('g')
            .selectAll('.label')
            .data(data,(value,index)=>index)
            .join(
                (enter)=>enter.append('text')
                    .attr("class","label")
                    .text(node => node)
                    .attr("dx",0)
                    .attr("dy",(value,index)=>yScale(index)+yScale.bandwidth()/1.5)
                    .transition()
                    .duration(1000)
                    .attr('font-size',15)
                    .attr("dx",0+textOffsetX)
                ,
                (update)=>update
                    .attr('font-size',15)
                    .attr("dx",0+textOffsetX)
                    .attr("dy",(value,index)=>yScale(index)+yScale.bandwidth()/1.5)
                )

    },[data])
    
    return (
        <div className="">
          <svg  ref={svgRef}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
          <br></br>
          <button onClick={()=>{
             let dataTemp = [...data];
             dataTemp.push(Math.round(Math.random() * 100));
             setData(dataTemp)
          }}>Add</button>
      </div>
    )
}

export default RacingChart
