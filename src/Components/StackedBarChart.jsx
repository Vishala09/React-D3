import React from 'react'
import { useEffect,useState , useRef } from 'react';
import { scaleBand, scaleLinear, select , max , axisBottom , axisLeft , stack , stackOrderAscending , schemeDark2, scaleOrdinal } from 'd3';

function StackedBarChart() {

    const initialData = [
        {
            'year':'2000',
            'google':20,
            'facebook':30,
            'amazon':10
        },
        {
            'year':'2001',
            'google':10,
            'facebook':25,
            'amazon':30
        },
        {
            'year':'2002',
            'google':20,
            'facebook':10,
            'amazon':10
        },
        {
            'year':'2003',
            'google':30,
            'facebook':20,
            'amazon':10
        },
        {
            'year':'2004',
            'google':10,
            'facebook':10,
            'amazon':30
        }
    ]
    const keys = ['google','facebook','amazon']
    const [data,setData] = useState(initialData);
    const svgRef = useRef();

    useEffect(()=>{

        const width = 500; 
        const height = 300; 

      const svg = select(svgRef.current)
        .attr("viewBox",`0 0 ${width} ${height}`)
        .attr("preserveAspectRatio","xMidYMid meet")
        .style("height",height)
        .style("width",'100%')

        const stackGenerator = stack()
                    .keys(keys)
                    .order(stackOrderAscending);
        
        const layers = stackGenerator(data);
        console.log(layers)
        const extent = [
            0,
            max(layers, layer => max(layer, sequence => sequence[1]))
        ];
  
      const xScale = scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width])
        .padding(0.25);
  
      const yScale = scaleLinear()
        .domain(extent)
        .range([height, 0]);

      const colorScale = scaleOrdinal()
        .domain(keys)
        .range(schemeDark2);
  
      svg
        .selectAll(".layer")
        .data(layers)
        .join("g")
        .attr("class", "layer")
        .attr("fill", layer => colorScale(layer.key))
        .selectAll("rect")
        .data(layer => layer)
        .join("rect")
        .attr("x", sequence => xScale(sequence.data.year)) //From where it starts on x-axis for each data point
        .attr("width", xScale.bandwidth()) //Where to end on x-axis for each data point
        .attr("y", sequence => yScale(sequence[1]))
        .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]));
  
      // axes
      const xAxis = axisBottom(xScale);
      svg.select(".x-axis").attr("transform", `translate(0, ${height})`).call(xAxis);
  
      const yAxis = axisLeft(yScale);
      svg.select(".y-axis").call(yAxis);

    },[data])
    
    return (
        <div className="">
          <svg  ref={svgRef}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
          </svg>
      </div>
    )
}

export default StackedBarChart
