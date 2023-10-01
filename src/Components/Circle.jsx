import React from 'react'
import { useEffect,useState , useRef } from 'react';
import {select,max} from 'd3';

function Circle() {

    const [data,setData] = useState([10,20,30,40,50]);
    const svgRef = useRef();
    
    useEffect(() => {
        const svg = select(svgRef.current);
        let maxEl = max(data);
        const circleElements = svg
            .append('g')
            .selectAll('circle')
            .data(data)
            // .join(
            //      (enter)=>enter.append('circle').attr('class','enter'),
            //      (update)=>update.append('circle').attr('class','update'),
            //      (exit)=>exit.remove()
            // )
            .enter().append('circle')
            .attr("r",(value,i)=>value)
            .attr("cx",(value,i)=>100*(i+1)+50)
            .attr("cy",(value,i)=>maxEl+10)
            .attr("stroke","red")
            .style("fill","green")
            
        const textElems = svg.append('g')
            .selectAll('text')
            .data(data)
            .enter().append('text')
            .text(node => node)
            .attr('font-size',8)
            .attr("dx",(value,i)=>100*(i+1)+45)
            .attr("dy",(value,i)=>maxEl+15)
    }, [])
    

    return (
      <div className="">
          <svg style={{width:'100%',height:'100%',border:'2px solid black'}} ref={svgRef}></svg>
      </div>
    );
}

export default Circle
