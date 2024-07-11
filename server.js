const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const thirdPartyServer = 'https://example.com/numbers';

let numbersWindow = [];

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    const validIds = ['p', 'f', 'e', 'r'];

    if (!validIds.includes(numberid)) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    try {
        const response = await axios.get(`${thirdPartyServer}/${numberid}`, { timeout: 500 });
        const fetchedNumbers = response.data.numbers;

        // Ensure numbers are unique and update the window
        const newNumbers = fetchedNumbers.filter(num => !numbersWindow.includes(num));
        numbersWindow = [...numbersWindow, ...newNumbers].slice(-WINDOW_SIZE);

        // Calculate the average
        const sum = numbersWindow.reduce((acc, num) => acc + num, 0);
        const avg = (sum / numbersWindow.length).toFixed(2);

        res.json({
            windowPrevState: numbersWindow.slice(0, -newNumbers.length),
            windowCurrState: numbersWindow,
            numbers: fetchedNumbers,
            avg: avg
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch numbers' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
