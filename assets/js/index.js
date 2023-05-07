function updateNoteList(data) {
    const noteList = document.querySelector('.note-list');
    noteList.innerHTML = '';
  
    data.forEach(note => {
      const noteItem = document.createElement('li');
      noteItem.classList.add('note-item');
      noteItem.dataset.noteId = note.id;
  
      const noteTitle = document.createElement('h3');
      noteTitle.classList.add('note-title');
      noteTitle.textContent = note.title;
  
      const noteText = document.createElement('p');
      noteText.classList.add('note-text');
      noteText.textContent = note.text;
  
      noteItem.appendChild(noteTitle);
      noteItem.appendChild(noteText);
      noteList.appendChild(noteItem);
    });
  }
  
// Add event listener to Save icon
document.querySelector('.save-note').addEventListener('click', function() {
    // Get note title and text
    const noteTitle = document.querySelector('.note-title').value;
    const noteText = document.querySelector('.note-textarea').value;
  
    // Send POST request to server with new note data
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: noteTitle,
        text: noteText
      })
    })
    .then(response => response.json())
    .then(data => {
      // Update left-hand column with updated list of notes
      updateNoteList(data);
    });
  });
  