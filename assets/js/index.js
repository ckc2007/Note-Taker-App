// Add event listener to Save icon
document.querySelector('.save-note').addEventListener('click', function() {
    // Get note title and text
    const noteTitle = document.querySelector('.note-title').value;
    const noteText = document.querySelector('.note-textarea').value;