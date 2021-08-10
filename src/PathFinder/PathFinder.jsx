import React, { Component } from 'react';

import Node from "./Node/Node";

import "./PathFinder.css";

import {dijkstraAlgo,shortestPathSequence} from "../algorithms/dijkstra";



let maxCol,maxRow;
if(window.screen.width>500){
    maxCol=50;
}else maxCol=14;
maxRow=15;

let initial_row=-1;
let initial_col=-1;
let last_row=-1;
let last_col=-1;


export default class PathFinder extends Component{
    constructor(props){
        super(props);
        this.state={
            grid:[],
            mouseIsPressed:false,
            startNode:-1,
            finishNode:-1,
            message:"",
            running:false
        }
    }

    componentDidMount(){
        // let maxCol=window.screen.width,maxRow=window.screen.height;
        
        if(window.screen.width>500){
            maxCol=50;
        }else maxCol=14;
        maxRow=15;
        // if(window.screen.height>)
        console.log("row",maxRow);
        console.log("col",maxCol);
        const grid=this.initializeGrid(maxRow,maxCol);
        this.setState({grid:grid});
    }

    clear=()=>{
        if(!this.state.running){
            // visitedNodesInOrder,nodesInShortestPath=shortestPathSequence;
            if(window.screen.width>500){
                maxCol=50;
            }else maxCol=14;
            for(let row=0;row<15;row++){
                for(let col=0;col<maxCol;col++){
                    document.getElementById(`node-${row}-${col}`).className='node';
                }
            }

            initial_row=-1;
            initial_col=-1;
            // document.getElementById(`node-${last_row}-${last_col}`).className='node';
            last_row=-1;
            last_col=-1;
            const newGrid=this.initializeGrid(maxRow,maxCol);
            console.log("grids",newGrid);
            // document.getElementById(`node-${initial_row}-${initial_col}`).className='node';
            
            this.setState({grid:newGrid,startNode:-1,finishNode:-1,message:""});    
        }else{
            // let msg=;
            this.setState({message:"Algo is running, please wait ..."});
            setTimeout(() => {
                this.setState({message:""});
            }, 2000);
        }
        
    }



    animatedijkstraAlgo=(visitedNodesInOrder,nodesInShortestPath)=>{
        for(let i=0;i<=visitedNodesInOrder.length;i++){
            // if(i===visitedNodesInOrder.length){
            //     setTimeout(()=>{
            //         this.getShortestPath()
            //     })
            // }
            if(i===visitedNodesInOrder.length){

                if(nodesInShortestPath.length===0){
                    this.setState({message:"Sorry, There is no way to reach destination..."});
                    setTimeout(() => {

                        this.setState({running:false});
                        this.setState({message:""});    
                    }, 1000);
                }else{
                    setTimeout(() => {

                        this.setState({running:false});
                        this.getShortestPath(nodesInShortestPath);
                    }, 10*i);
                }

                
            }else{
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                      'node node-visited';
                  }, 10 * i);    
            }
            
        }
    }


    
    mouseDown(row,col){
        let {startNode,finishNode}=this.state;
        if(startNode===-1){
            this.setState({startNode:1});
            initial_row=row;
            initial_col=col;
            document.getElementById(`node-${initial_row}-${initial_col}`).className='node node-start';
        }else if(finishNode===-1 && startNode!==-1){
            this.setState({finishNode:1});
            last_row=row;
            last_col=col;
            document.getElementById(`node-${last_row}-${last_col}`).className='node node-finish';
        }else if(!(initial_row===row && initial_col===col) && !(last_row===row && last_col===col)) {
            
            const newGrid=this.state.grid.slice();
            const node=newGrid[row][col];
            const newNode={
                ...node,
                isWall:!node.isWall
            }
            newGrid[row][col]=newNode;
            this.setState({grid:newGrid,mouseIsPressed:true});
        }
        
    }

    mouseUp(){
        this.setState({mouseIsPressed:false});
    }

    mouseEnter(row,col){
        if(!this.state.mouseIsPressed) return;
        else if(!(initial_row===row && initial_col===col) && !(last_row===row && last_col===col)) {
            
            const newGrid=this.state.grid.slice();
            const node=newGrid[row][col];
            const newNode={
                ...node,
                isWall:!node.isWall
            }
            newGrid[row][col]=newNode;
            this.setState({grid:newGrid});
        }
    }

    getShortestPath=(nodesInShortestPath)=>{

        for(let i=0;i<=nodesInShortestPath.length;i++){
            if(i===nodesInShortestPath.length){
                setTimeout(() => {
                    document.getElementById(`node-${initial_row}-${initial_col}`).className='node node-start';
                    
                }, i*50);
            }else{
                setTimeout(() => {
                    const node=nodesInShortestPath[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                      'node node-shortest-path';
                      
                }, i*50);
            }
            
        }
        // setTimeout(() => {
             
        // }, nodesInShortestPath.length*(nodesInShortestPath.length-1)*50/2);
        
        document.getElementById(`node-${last_row}-${last_col}`).className='node node-finish';
    }

    

    initializeGrid(maxRow,maxCol){
        const grid=[];
        for(let row=0;row<maxRow;row++){
            const currentrow=[];
            for(let col=0;col<maxCol;col++){
                let node={
                    row,    // row number
                    col,    // column number
                    isStart:row===initial_row && col===initial_col,
                    isFinish:row===last_row && col===last_col,
                    distance:Infinity,
                    isWall:false,
                    previouNode:null,
                    isVisited:false
                }
                currentrow.push(node);
            }
            grid.push(currentrow);
        }
        console.log("sunny");
        return grid;
    }
    // onClick(row,col){

    // }




    visualisedijkstraAlgo=()=>{
        this.setState({running:true});
        let {startNode,finishNode}=this.state;
        if(startNode!==-1 && finishNode!==-1){
            const {grid}=this.state;
            const startNode=grid[initial_row][initial_col];
            const finishNode=grid[last_row][last_col];
            const visitedNodesInOrder=dijkstraAlgo(grid,startNode,finishNode);
            const nodesInShortestPath=shortestPathSequence(finishNode);
            
            // console.log("s",nodesInShortestPath);
            this.animatedijkstraAlgo(visitedNodesInOrder,nodesInShortestPath);
        }else{
            this.setState({message:"please select starting and final point both..."});
            setTimeout(() => {
                this.setState({message:""});    
            }, 2000);
        }
        
    }

    render(){
        const {grid}=this.state;
        console.log("grid",this.state.grid);
        return(
            <div>
                <div className="header">
                    PathFinder
                </div>
                <div className="message">
                    <span >by Sunny Tyagi</span>
                    {this.state.message}
                </div>
                <div className="instruction">
                    1) First select the initial and final destination.<br/><br/>
                    2) Then select the walls (optional).<br/><br/>
                    3) Start being the "Doraa the Explorer".<br/><br/>
                </div>
                <div className="buttons">
                    <button onClick={()=>this.visualisedijkstraAlgo()} style={{margin:"5px"}}>find route</button>
                    <button onClick={()=>this.clear()} style={{margin:"5px"}}>clear</button>
                </div>
                {/* <div className="header">
                    {this.state.message}
                </div> */}
                <div className='grid'>
                    {grid.map((row,rowIndx)=>{
                        return(
                            <div key={rowIndx}>
                                {
                                    row.map((node,nodeIndx)=>{
                                        const {isStart,isFinish,isVisited,row,col,isWall}=node
                                        return<Node 
                                                key={nodeIndx}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                test={'foo'}
                                                col={col}
                                                isWall={isWall}
                                                mouseIsPressed={this.state.mouseIsPressed}
                                                onMouseDown={(row, col) => this.mouseDown(row, col)}
                                                onMouseEnter={(row, col) =>
                                                    this.mouseEnter(row, col)
                                                }
                                                onMouseUp={() => this.mouseUp()}
                                                row={row}
                                                isVisited={isVisited}
                                            ></Node>
                                    })
                                }
                            </div>
                        );
                    
                    })}
                </div>
            </div>
        )
    }
}