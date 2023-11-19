async function generateComic() {
    const inputs = [];
    for (let i = 1; i <= 1; i++) {
        const panelText = document.getElementById(`panel${i}`).value;
        console.log(panelText);
        inputs.push(panelText);
    }

    try {
        const response = await fetch('/generate-comic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({inputs: inputs[0]}),
        });

        if (!response.ok) {
            throw new Error('Error generating comic');
        }
        console.log(response);
        const comicImageUrl = await response.blob();
        const comicOutput = document.getElementById('comicOutput');
        comicOutput.innerHTML = `<img src="${URL.createObjectURL(comicImageUrl)}" alt="Generated Comic">`;

    } catch (error) {
        console.error('Error:', error.message);
    }
}
