document.addEventListener('DOMContentLoaded', function() {
    const notesList = document.getElementById('notes-list');

    // Cargar notas desde el almacenamiento local
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Función para renderizar las notas
    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <p class="note-content">${note}</p>
                <div class="actions">
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Eliminar</button>
                </div>
            `;
            notesList.appendChild(noteDiv);
        });
    }

    // Función para guardar una nueva nota
    function saveNote() {
        const noteContent = document.getElementById('note-content');
        const noteText = noteContent.value.trim();
        const noteIndex = localStorage.getItem('editIndex');

        if (noteText) {
            if (noteIndex === null) {
                notes.push(noteText);
            } else {
                notes[noteIndex] = noteText;
                localStorage.removeItem('editIndex');
            }
            localStorage.setItem('notes', JSON.stringify(notes));
            window.location.href = 'index.html';
        } else {
            alert('No puedes guardar una nota vacía');
        }
    }

    // Función para eliminar una nota
    function deleteNote(index) {
        if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    }

    // Función para editar una nota
    function editNote(index) {
        localStorage.setItem('editIndex', index);
        window.location.href = 'crear-nota.html';
    }

    // Manejo de eventos
    if (notesList) {
        notesList.addEventListener('click', function(event) {
            const index = event.target.getAttribute('data-index');
            if (event.target.classList.contains('delete')) {
                deleteNote(index);
            } else if (event.target.classList.contains('edit')) {
                editNote(index);
            }
        });
    }

    const newNoteButton = document.getElementById('new-note-btn');
    if (newNoteButton) {
        newNoteButton.addEventListener('click', function() {
            localStorage.removeItem('editIndex');
            window.location.href = 'crear-nota.html';
        });
    }

    const saveNoteButton = document.getElementById('save-note-btn');
    if (saveNoteButton) {
        saveNoteButton.addEventListener('click', saveNote);

        const noteIndex = localStorage.getItem('editIndex');
        if (noteIndex !== null) {
            document.getElementById('note-content').value = notes[noteIndex];
        }
    }

    // URLs de los fondos de pantalla
    const fondos = [
        "https://images8.alphacoders.com/133/1336966.jpeg",
        "https://wallpapers.com/images/featured/minimalist-7xpryajznty61ra3.jpg",
        "https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/ad01ceaa-b929-4516-a1fe-a84f1cf1fe34/Mountain+%26+River+4k",
        "https://cdn.hero.page/wallpapers/abef7a18-2e69-46e2-86a6-c1ba351c3101-nature's-geometry-minimalist-mountain-art-wallpaper-2.png",
        "https://cdn.pixabay.com/photo/2021/07/15/08/43/abstract-6467845_1280.png"
    ];

    // URL de la imagen de fondo predeterminada
    const fondoPredeterminado = "https://wallpapers.com/images/featured/1080p-minimalist-85m2yfqvqtbjdak9.jpg";

    // Selecciona el elemento donde se cambiará el fondo
    const body = document.body;

    // Función para cambiar el fondo
    function cambiarFondo() {
        // Selecciona un fondo al azar del array
        const fondoAleatorio = fondos[Math.floor(Math.random() * fondos.length)];
        
        // Crea una nueva imagen para comprobar si se carga correctamente
        const img = new Image();
        img.src = fondoAleatorio;
        
        img.onload = function() {
            // Si la imagen se carga correctamente, actualiza el fondo
            body.style.backgroundImage = `url(${fondoAleatorio})`;
        };

        img.onerror = function() {
            // Si hay un error al cargar la imagen, usa el fondo predeterminado
            body.style.backgroundImage = `url(${fondoPredeterminado})`;
        };

        body.style.backgroundSize = 'cover'; // Ajusta el tamaño del fondo
        body.style.backgroundPosition = 'center'; // Centra el fondo
    }

    // Cambia el fondo al cargar la página
    cambiarFondo();

    // Evento para cambiar el fondo al hacer clic en el botón
    const changeBackgroundButton = document.getElementById('change-background-btn');
    if (changeBackgroundButton) {
        changeBackgroundButton.addEventListener('click', cambiarFondo);
    }

    renderNotes();
});
