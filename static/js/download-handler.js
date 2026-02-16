// Download Handler JavaScript

/**
 * Triggers file download using fetch API
 * @param {string} filePath - The route to download from
 * @param {string} fileName - The name to save the file as
 */
function downloadFile(filePath, fileName = 'test.txt') {
    // Show loading state
    const downloadBtn = event.target.closest('button, a') || event.target;
    const originalHTML = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Downloading...';
    downloadBtn.disabled = true;

    fetch(filePath, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Create a blob URL and download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;

            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the blob URL
            window.URL.revokeObjectURL(blobUrl);

            // Reset button
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;

            // Show success message
            showDownloadSuccess();
        })
        .catch(error => {
            console.error('Download error:', error);
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;

            // Show error alert
            alert('Download failed: ' + error.message + '\n\nPlease try again or refresh the page.');
        });
}

/**
 * Show success notification
 */
function showDownloadSuccess() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Success!</strong> Your file has been downloaded.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/**
 * Download from navbar - downloads directly without navigating
 */
function downloadFromNavbar() {
    downloadFile('/download-file', 'test.txt');
}

/**
 * Download from download center page
 */
function downloadFromDownloadCenter() {
    downloadFile('/download-file', 'test.txt');
}
