export function dijkstraAlgo(grid, initial, last) {
    const ans = [];

    initial.distance = 0;

    const allnode = getAllNodes(grid);

    while (!!allnode.length) {

      sort(allnode);

      const nearest = allnode.shift();

      if (nearest.isWall) continue;

      if (nearest.distance === Infinity) return ans;
      nearest.isVisited = true;

      ans.push(nearest);
      
      if (nearest === last) return ans;
      
      update(nearest, grid);
    }
  }

function update(node, grid) {

    const unvisitednode = getunvisitednode(node, grid);
  
    for (const neighbor of unvisitednode) {
  
      neighbor.distance = node.distance + 1;
  
      neighbor.previousNode = node;
  
    }
  
  }

function getunvisitednode(node, grid) {
    
    const neighbors = [];
    
    const {col, row} = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    
    if (col > 0) neighbors.push(grid[row][col - 1]);
    
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  function sort(allnode) {
    
    allnode.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  
  }

  
  function getAllNodes(grid) {
  
    const nodes = [];
  
    for (const row of grid) {
  
      for (const node of row) {
  
        nodes.push(node);
  
      }
  
    }
  
    return nodes;
  
  }

  export function shortestPathSequence(last){
  
      let {previousNode}=last;
  
      const shortestPathOrder=[];
  
      while(previousNode){
  
        shortestPathOrder.push(previousNode);
  
        previousNode=previousNode.previousNode;
  
      }
  
      return shortestPathOrder;
  }
  