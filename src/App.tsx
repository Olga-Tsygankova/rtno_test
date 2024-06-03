import './App.css';
import {DialogsTable} from "./components/DialogsTable/DialogsTable";
import {SideBar} from "./components/SideBar/SideBar";
function App() {

  return (
      <div className="App">
          <div className="content">
          <SideBar/>
          <DialogsTable/>
          </div>
      </div>

  );
}

export default App;
