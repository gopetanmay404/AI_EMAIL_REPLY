console.log("Email Writer Extension - Content Script Loaded");
function createAIButton() {
   const button = document.createElement('div');
   button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
   button.style.marginRight = '8px';
   button.innerHTML = 'AI Reply';
   button.setAttribute('role','button');
   button.setAttribute('data-tooltip','Generate AI Reply');
   return button;
}


// to be removed...
function createMicButton() {
   const button = document.createElement('div');
   button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
   button.style.marginRight = '8px';
   button.innerHTML = '🎤 Speak';
   button.setAttribute('role','button');
   button.setAttribute('data-tooltip','Speak to Generate Reply');
   return button;
}


//to be removed...
















function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
        return '';
    }
}
function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
        return null;
    }
}
function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();
    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    const micButton = createMicButton();      // to be removed
    button.classList.add('ai-reply-button');
    micButton.classList.add('ai-mic-button');     //to be removed
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
            //const response = await fetch('http://localhost:8080/api/email/generate-auto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone:"reply back with the same tone been required ,like professional to prfoessional or other tones u r getting"
                })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box was not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled =  false;
        }
    });



    // to be removed 

    micButton.addEventListener('click', () => {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            alert("🎙 Speak now to generate reply...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Voice Input:", transcript);
             const box = document.querySelector('[role="textbox"][g_editable="true"]');
    if (box) {
        box.focus();
        document.execCommand('insertText', false, "[Heard: " + transcript + "]\n");
    }
            fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: transcript,
                    tone: "friendly"
                })
            })
            .then(res => res.text())
            .then(reply => {
                const box = document.querySelector('[role="textbox"][g_editable="true"]');
                if (box) {
                    box.focus();
                    document.execCommand('insertText', false, reply);
                } else {
                    alert("Textbox not found!");
                }
            });
        };

        recognition.onerror = (e) => {
            alert("Mic Error: " + e.error);
        };

        recognition.start();
    });


    // to be removed...




    toolbar.insertBefore(micButton, toolbar.firstChild);// to be removed 
    toolbar.insertBefore(button, toolbar.firstChild);
}
const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
// observer.observe(document.head);
