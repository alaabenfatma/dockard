import logo from './logo.svg';
import './App.css';
import { SplitPane } from "react-collapse-pane";

import TextEditor from './components/TextEditor';
import OverviewFlow from './components/OverviewFlow';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SplitPane split="vertical" collapse={true}>
          <div >
            <TextEditor />
          </div>
          <div>
            <OverviewFlow />
          </div>
        </SplitPane>

      </header>
    </div>
  );
}

export default App;
