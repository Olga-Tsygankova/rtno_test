import './App.css';
import {DialogsTable} from "./components/DialogsTable/DialogsTable";
import {SideBar} from "./components/SideBar/SideBar";
function App() {

  return (
      <div className="App">
          <header className="App-header">
              Таблица
          </header>
          <div>
          <SideBar/>
          <DialogsTable/>
          </div>
      </div>

  );
}

export default App;
