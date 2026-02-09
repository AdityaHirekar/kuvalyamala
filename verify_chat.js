// Native fetch is available in Node 18+

async function verify() {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] })
        });

        if (!response.ok) {
            console.error('Status:', response.status);
            const text = await response.text();
            const fs = require('fs');
            fs.writeFileSync('error.log', text);
            console.error('Body written to error.log');
            return;
        }

        const data = await response.json();
        console.log('Full Response JSON:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

verify();
