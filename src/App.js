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

function App() {


  return (
    <div style={{padding:'20px'}} className="">
       <Circle/>
       <Scales />
       <Path />
       <DonutChart />
       <BarChart />
       <RacingChart />
       <TreeChart />
       <StackedBarChart />
    </div>
  );
}

export default App;
