import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./store";
import {Counter} from "./components/counter/Counter";
import {MyIp} from "./components/myip/myip";
import {Button} from "./components/widgets/Button";

function App() {
  return (
    <Provider store={store}>
        <div className="p-1">
            <div>
                <Counter/>
                <br/>
                <MyIp/>
                <br/>
                <Button>test</Button>
                <Button>teste 2</Button>
            </div>
        </div>
    </Provider>
  );
}

export default App;
