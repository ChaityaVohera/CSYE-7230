import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Dashboard from "./components/dashboard/Dashboard";
import Connections from "./components/connections/Connections";
import { ThemeProvider } from 'react-bootstrap';
import Feeds from "./components/feeds/Feeds";

function App() {
  localStorage.setItem("userInfo", JSON.stringify(""));
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route exact path="/dashboard" component={Dashboard }></Route>
      <Route exact path="/feeds" component={Feeds}></Route>
      <Route exact path="/connections" component={Connections}></Route>
      
    </div>
  );
}

export default App;
