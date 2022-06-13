import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TabMenu from './components/TabMenu';
import TabView from './components/TabView';

function App() {
  // drawImage 좌표 어떻게 구현할지 > 자료구조 변경 필요
  const tabList = [
    { id: 0, title:"버스", subtitle: "차도면", src: "bus_0", width: 2468, height: 1200, drawing:"drawImage", points: [{x:750,y:690,width:810,height:220}, {x:1878,y:688,width:200,height:206}], },
    { id: 1, title:"버스", subtitle: "인도면", src: "bus_1", width: 2470, height: 1200, drawing:"drawImage", points: [{x:196,y:712,width:310,height:206},{x:1318,y:694,width:430,height:250}], },
    { id: 2, title:"버스", subtitle: "후면", src: "bus_2", width:2468, height: 1200, drawing:"fill", points: [{point:[[160,485],[2266,485],[2303,899],[130,899]],width:2100,height:416}], }
  ];

  const [mode, setMode] = useState(tabList[0].id);

  return (
    <div className="App">
      <Header></Header>
      <TabMenu tabList={tabList} onChangeMode={
        function (selectMode) {setMode(selectMode);}
      }></TabMenu>
      <TabView typeMode={mode} tabList={tabList}></TabView>
    </div>
  );

  
}

export default App;
