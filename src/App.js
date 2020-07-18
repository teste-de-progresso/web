import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./store";
import {Counter} from "./components/counter/Counter";
import {MyIp} from "./components/myip/myip";

function App() {
  return (
    <Provider store={store}>
        <div className="bg-gray-100">
            <div className="bg-blue-700">
                <Counter/>
                <br/>
                <MyIp/>
            </div>
        </div>
    </Provider>
  );
}

export default App;
