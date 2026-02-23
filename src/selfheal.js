class SelfHeal {
    constructor(serverUrl, apiKey) {
        this.serverUrl = serverUrl;
        this.apiKey = apiKey;
    }

    init(repo, filePath) {
        const handleError = async (errorMsg, stack) => {
            try {
                await fetch(this.serverUrl + "/heal", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        repo: repo,
                        file_path: filePath,
                        error: errorMsg,
                        stack: stack
                    })
                });
            } catch (err) {
                console.error("SelfHeal: Failed to send crash report", err);
            }
        };

        window.addEventListener('error', (event) => {
            handleError(event.message, event.error?.stack);
        });
        window.addEventListener('unhandledrejection', (event) => {
            handleError(event.reason?.message || 'Unhandled Rejection', event.reason?.stack);
        });
    }
}
export default SelfHeal;
