import './App.css';
import { Board } from './components/board/board';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { useState } from 'react';


function App() {
  const [valueActiveTasks, setValueActiveTasks] = useState('')
  const [valueFinishedTasks, setValueFinishedTasks] = useState('')

  function getFromBoardToApp(activeTasks,finishedTasks) {
      setValueActiveTasks(activeTasks);
      setValueFinishedTasks(finishedTasks)
  }

  return (
    <>      
      <Header/>
        <main>
          <Board getFromBoardToApp={getFromBoardToApp}/>
        </main>
      <Footer valueActiveTasks={valueActiveTasks} valueFinishedTasks={valueFinishedTasks}/>
    </>
  );
}

export default App;
