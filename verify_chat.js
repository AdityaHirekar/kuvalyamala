// Native fetch is available in Node 18+

async function verify() {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'Who are you?' }] })
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
        console.log('Response:', data);
    } catch (e) {
        console.error('Error:', e);
    }
}

verify();
