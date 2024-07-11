import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [numberId, setNumberId] = useState('e');
    const [data, setData] = useState(null);

    const fetchNumbers = async () => {
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <select value={numberId} onChange={e => setNumberId(e.target.value)}>
                <option value="p">Prime</option>
                <option value="f">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={fetchNumbers}>Fetch Numbers</button>
            {data && (
                <div>
                    <h2>Results</h2>
                    <p>Window Previous State: {JSON.stringify(data.windowPrevState)}</p>
                    <p>Window Current State: {JSON.stringify(data.windowCurrState)}</p>
                    <p>Numbers: {JSON.stringify(data.numbers)}</p>
                    <p>Average: {data.avg}</p>
                </div>
            )}
        </div>
    );
}

export default App;
