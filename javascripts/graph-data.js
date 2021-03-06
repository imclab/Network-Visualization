data = [{count:70,country:"Lantern",flag:"imgs/Lantern.png"},
        {count:30,country:"China",flag:"imgs/China.png"},
        {count:20,country:"USA",flag:"imgs/USA.png"},
        {count:20,country:"UK",flag:"imgs/UK.png"},
        {count:15,country:"Australia",flag:"imgs/Australia.png"},
        {count:12,country:"Brazil",flag:"imgs/Brazil.png"},
        {count:3,country:"Iran",flag:"imgs/Iran.svg"},
        {count:6,country:"North Korea",flag:"imgs/NorthKorea.png"}];

var width = 910,
    height = 300,
    links = [];

data.forEach(function(target) {
        links.push({source: data[0], target: target});
});

console.log(links);

var vis = d3.select(".data").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

vis.append("svg:rect")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .nodes(data)
    .links(links)
    .size([width, height])
    .linkDistance(100)
    .charge(-120)
    .start();

var link = vis.selectAll("line.link")
    .data(links)
  .enter().append("svg:line")
    .attr("class", "link")
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

var node = vis.selectAll("g.node")
    .data(data)
  .enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag);

node.append("svg:image")
    .attr("class", "circle")
    .attr("xlink:href", function(d) { return d.flag; })
    .attr("x", function(d) { return -d.count/2; })
    .attr("y", function(d) { return -d.count/2; })
    .attr("height", function(d) { return d.count;  })
    .attr("width",  function(d) { return d.count;  })
    .attr("dx", 9)
    .attr("dy", ".25em");

node.append("title")
    .text(function(d) { return d.country+'\n'+d.count+' users'; });

force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});


force.start();
