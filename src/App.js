import logo from './logo.svg';
import './App.css';
import Circle from './Components/Circle';
import Path from './Components/Path';
import BarChart from './Components/BarChart';
import DonutChart from './Components/DonutChart';

function App() {


  return (
    <div style={{padding:'20px'}} className="">
       <Circle/>
       <Path />
       <BarChart />
       <DonutChart />
    </div>
  );
}

export default App;
