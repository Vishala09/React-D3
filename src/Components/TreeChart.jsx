import React from 'react'
import { useEffect,useState , useRef } from 'react';
import { select , hierarchy , tree , linkVertical , linkHorizontal , cluster , pack} from 'd3';

function TreeChart() {

    const initialData = {
      name: "👩‍❤️‍💋‍👨",
      children: [
        {
          name: "👫",
          children: [
            {
              name: "🫂",
              children: [
                {
                  name: "👯‍♂️"
                },
                {
                  name: "👯‍♂️"
                }
              ]
            },
            {
              name: "🧎",
              children: [
                {
                  name: "👨‍🦽"
                },
                {
                  name: "👨‍🦽"
                }
              ]
            },
            {
              name: "🧎‍♀️",
              children: [
                {
                  name: "👩‍🦼"
                },
                {
                  name: "👩‍🦼"
                }
              ]
            }
          ]
        },
        {
          name: "👨‍👩‍👧",
          children: [
            {
              name: "👨‍👩‍👧‍👦"
            },
            {
              name: "👨‍👩‍👦‍👦"
            },
            {
              name: "👨‍👩‍👧‍👧"
            }
          ]
        }
      ]
    };
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
        .append('g')

      const treeData = hierarchy(data);
      const treeLayout = cluster().size([height,width]) //tree()
      treeLayout(treeData);
      const treeDescendants = treeData.descendants();
      console.log(treeDescendants)
      const linkGenerator = linkHorizontal()
                .source(link=>link.source)
                .target(link=>link.target)
                .x(node => node.y)
                .y(node => node.x)

      svg.selectAll('.node')
          .data(treeDescendants)
          .join('circle')
          .attr('class','node')
          .attr('r',4)
          .attr('fill','black')
          .attr('cx',node => node.y)
          .attr('cy',node =>node.x)
          .style('opacity',0.1)
          .transition()
          .delay(node => node.parent?.depth*2000 == null ? 0 : node.parent?.depth*2000)
          .duration(2000)
          .style('opacity',1)

      svg.selectAll('.label')
          .data(treeDescendants)
          .join('text')
          .attr('class','.label')
          .attr('dx',(node,i) => node.parent == null ? node.y : node.parent?.y)
          .attr('dy',(node,i) => node.parent == null ? node.x : node.parent?.x)
          .transition()
          .delay(node => node.parent == null ? 0 : node.parent?.depth*2000)
          .duration(2000)
          .attr('size','32px')
          .attr("dx",node =>node.y)
          .attr("dy",node =>node.x)
          .text(node => node.data.name)

      svg.selectAll('.link')
          .data(treeData.links())
          .join('path')
          .attr('class','link')
          .attr('fill','none')
          .attr('stroke','black')
          .attr('d',linkGenerator)
          .attr('stroke-dasharray',function(){
            const length = this.getTotalLength();
            return `${length} ${length}` //visiblepart inivisiblepart 
          })
          .attr('stroke-dashoffset',function(){
            const length = this.getTotalLength();
            return length;
          })
          .transition()
          .delay(linkobj => linkobj.source.depth*2000)
          .duration(2000)
          .attr('stroke-dashoffset',0)

      
        
    },[data])
    
    return (
        <div className="">
          <svg  ref={svgRef}></svg>
      </div>
    )
} 

export default TreeChart
