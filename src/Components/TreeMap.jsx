import React from 'react'
import { useEffect,useState , useRef } from 'react';
import { select , hierarchy , treemap , linkVertical , linkHorizontal , cluster , pack, zoomTransform, format, scaleOrdinal, schemeTableau10} from 'd3';
import * as d3 from 'd3';
function TreeMap() {

    const dataset = {"children":[{"name":"😁","children":[{"name":"😉","group":"A","value":28},
    {"name":"😄","group":"A","value":19},{"name":"😅","group":"C","value":18,},
    {"name":"😆","group":"C","value":19,}]},
    {"name":"😡","children":[{"name":"😠","group":"C","value":14,},
    {"name":"😤","group":"A","value":11,},{"name":"😱","group":"B","value":15,},
    {"name":"😲","group":"B","value":16,}]},
    {"name":"😸","children":[{"name":"😹","group":"B","value":10,},
    {"name":"😺","group":"A","value":13,},{"name":"😻","group":"A","value":13,},
    {"name":"😼","group":"D","value":25,},{"name":"😽","group":"D","value":16,},
    {"name":"😾","group":"D","value":28,}]}],"name":"🙋"};
// .
    const [data,setData] = useState(dataset);
    const svgRef = useRef();

    useEffect(()=>{

        const width = 500; 
        const height = 300; 

      const svg = select(svgRef.current)
        .attr("viewBox",`0 0 ${width} ${height}`)
        .attr("preserveAspectRatio","xMidYMid meet")
        .style("height",height)
        .style("width",'100%')
        .append('g')

        var root = d3.hierarchy(data).sum(function(d){ return d.value});

        // initialize treemap
        d3.treemap()
            .size([width, height])
            .paddingTop(28)
            .paddingRight(7)
            .paddingInner(3)
            (root);
        
        console.log(root.leaves())
        const keys = root.data.children.map(c=>c.name);
        
        const color = d3.scaleOrdinal()
            .domain(keys)
            .range(d3.schemeTableau10);

        const opacity = d3.scaleLinear()
            .domain([0, 30])
            .range([0.1,1]);


        // Select the nodes
        var nodes = svg
                    .selectAll("rect")
                    .data(root.leaves())

        // draw rectangles
        nodes.enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function(d){ return color(d.parent.data.name)} )
            .style("opacity", function(d){ return opacity(d.data.value)})

        nodes.exit().remove()

        // select node titles
        var nodeText = svg
            .selectAll("text")
            .data(root.leaves())

        // add the text
        nodeText.enter()
            .append("text")
            .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.name })
            .attr("font-size", "19px")
            .attr("fill", "white")
        
        // select node titles
        var nodeVals = svg
            .selectAll("vals")
            .data(root.leaves())  

        // add the values
        nodeVals.enter()
            .append("text")
            .attr("x", function(d){ return d.x0+15})    // +10 to adjust position (more right)
            .attr("y", function(d){ return d.y0+30})    // +20 to adjust position (lower)
            .text(function(d){ return d.data.value })
            .attr("font-size", "11px")
            .attr("fill", "white")
    
        // add the parent node titles
        svg
        .selectAll("titles")
        .data(root.descendants().filter(function(d){return d.depth==1}))
        .enter()
        .append("text")
            .attr("x", function(d){ return d.x0})
            .attr("y", function(d){ return d.y0+21})
            .text(function(d){ return d.data.name })
            .attr("font-size", "19px")
            .attr("fill",  function(d){ return color(d.data.name)} )
    

    },[data])
    
    return (
        <div className="">
          <svg  ref={svgRef}></svg>
      </div>
    )
} 

export default TreeMap
