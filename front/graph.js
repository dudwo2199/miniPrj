const svg = d3.select('svg');
const width = window.innerWidth;
const height = window.innerHeight;
const container = svg.append('g');

// 줌 지원
svg.call(
  d3
    .zoom()
    .scaleExtent([0.1, 5])
    .on('zoom', (event) => {
      container.attr('transform', event.transform);
    })
);

async function loadAndDraw() {
  const res = await fetch('http://127.0.0.1/api/board/all');
  const data = await res.json();
  const boards = data || [];

  // 노드 구성
  const nodes = boards.map((b) => ({
    id: b.no.toString(),
    title: b.title,
    isRoot: b.parentNo === null || b.parentNo === undefined,
  }));

  // 링크 구성: PARENT_NO가 있을 때만 연결
  const links = boards
    .filter((b) => b.parentNo !== null && b.parentNo !== undefined)
    .map((b) => ({
      source: b.no.toString(),
      target: b.parentNo.toString(),
    }));

  drawGraph(nodes, links);
}

function drawGraph(nodes, links) {
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2));

  const link = container
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', 1.5);

  const node = container
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 10)
    .attr('fill', (d) => (d.isRoot ? '#ff4500' : '#4f80ff'))
    .call(
      d3
        .drag()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    )
    .on('click', (event, d) => {
      alert(`게시글 상세 정보\nID: ${d.id}\n제목: ${d.title}`);
    });

  const labels = container
    .append('g')
    .selectAll('text')
    .data(nodes)
    .join('text')
    .text((d) => d.title)
    .attr('text-anchor', 'middle')
    .attr('dy', -15);

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

    labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
  });
}

loadAndDraw();
