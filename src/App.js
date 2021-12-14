import "./App.css";

import MessageSender from "./components/MessageSender";
import Post from "./components/Post";

function App() {
  return (
    <div className="app">
      <MessageSender />
      <Post />
    </div>
  );
}

export default App;
