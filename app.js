import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', 'public');
app.use(express.static('static'));

const apiUrl = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';

// Handle GET request to serve the HTML page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Handle POST request to generate comic
app.post('/generate-comic', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const result = await queryHuggingFaceAPI(data);
        res.send(result);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

async function queryHuggingFaceAPI(data) {
    console.log(data);
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.buffer();
    console.log(result);
	return result;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
