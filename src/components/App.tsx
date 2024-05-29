import React from 'react';
import './App.scss'

const App = () => {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <button  onClick={() => setCount((prev) => prev + 1)}>increment count</button>
            roots {count}
        </div>
    );
};

export default App;