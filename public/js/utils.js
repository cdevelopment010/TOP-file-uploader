function copyShareLink(shareId) {
    const shareLink = `${window.location.origin}/share/${shareId}`;
    navigator.clipboard.writeText(shareLink)
        .then(() => {
            alert('Share link copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy link.');
        });
}
