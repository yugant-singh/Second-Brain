import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import Navbar from "../../shared/components/Navbar/Navbar.jsx"
import Sidebar from "../../shared/components/Sidebar/Sidebar.jsx"
import { getGraphDataAPI } from "../services/graph.api.js"
import "./GraphPage.scss"

const GraphPage = () => {
  const svgRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)
  const [graphData, setGraphData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getGraphDataAPI()
        setGraphData(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Alag useEffect — jab loading false ho aur SVG ready ho tab draw karo
  useEffect(() => {
    if (!loading && graphData && svgRef.current) {
      drawGraph(graphData.nodes, graphData.edges)
    }
  }, [loading, graphData])

  const drawGraph = (nodes, edges) => {
    const width = svgRef.current.clientWidth || window.innerWidth - 220
    const height = svgRef.current.clientHeight || 500

    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id((d) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))

    const link = svg.append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "rgba(0, 212, 255, 0.2)")
      .attr("stroke-width", 1)

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "rgba(0, 212, 255, 0.6)")
      .attr("stroke", "rgba(0, 212, 255, 0.9)")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("click", (event, d) => setSelectedNode(d))
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on("drag", (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.title.slice(0, 20))
      .attr("font-size", 11)
      .attr("fill", "rgba(255,255,255,0.6)")
      .attr("dx", 14)
      .attr("dy", 4)

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)

      label
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
    })
  }

  return (
    <div className="graph-page">
      <Navbar />
      <div className="graph-body">
        <Sidebar />
        <main className="graph-main">
          <div className="graph-header">
            <h1>Knowledge Graph</h1>
            <p>Discover connections between your saved items</p>
          </div>

          {loading ? (
            <div className="graph-loading">Loading graph...</div>
          ) : (
            <div className="graph-container">
              <svg ref={svgRef} width="100%" height="100%" />

              {selectedNode && (
                <div className="graph-tooltip">
                  <div className="tooltip-type">{selectedNode.type}</div>
                  <div className="tooltip-title">{selectedNode.title}</div>
                  <div className="tooltip-tags">
                    {selectedNode.tags.map((tag, i) => (
                      <span key={i} className="tooltip-tag">{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedNode(null)}>✕</button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default GraphPage