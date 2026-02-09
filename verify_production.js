
const fetch = require('node-fetch');

async function verifyProduction() {
    console.log("Testing https://kuvalyamala.vercel.app/api/chat ...");
    try {
        // We use a dummy message
        const response = await fetch('https://kuvalyamala.vercel.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] })
        });

        console.log(`Status: ${response.status} ${response.statusText}`);

        const text = await response.text();
        console.log('Response Body:', text.substring(0, 500));

        if (response.status === 200) {
            console.log("✅ SUCCESS: API Key is configured and route is working.");
        } else if (response.status === 503) {
            console.log("⚠️ LOADING: API Key is configured, but model is loading (Normal).");
        } else if (response.status === 500 && text.includes("Configuration Error")) {
            console.log("❌ ERROR: API Key is still MISSING.");
        } else if (response.status === 404) {
            console.log("❌ ERROR: Route not found. Redeployment might be needed.");
        } else {
            console.log("❓ UNKNOWN STATUS");
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

verifyProduction();
