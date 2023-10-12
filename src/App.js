import logo from './logo.svg';
import './App.css';
import Circle from './Components/Circle';
import Path from './Components/Path';
import BarChart from './Components/BarChart';
import DonutChart from './Components/DonutChart';
import RacingChart from './Components/RacingChart';
import Scales from './Components/Scales';
import TreeChart from './Components/TreeChart';
import StackedBarChart from './Components/StackedBarChart';
import StackedAreaChart from './Components/StackedAreaChart';
import TreeMap from './Components/TreeMap';

function App() {


  return (
    <div style={{padding:'20px'}} className="">
       <Circle/>
       <Scales />
       <Path />
       
       <BarChart />
       <RacingChart />
       <StackedBarChart /> 
       <StackedAreaChart />

       <DonutChart />
       
       <TreeChart />
       <TreeMap/>
    </div>
  );
}

export default App;
