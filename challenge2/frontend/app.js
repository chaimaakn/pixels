document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);
    formData.append('description', document.getElementById('description').value);

    try {
        const response = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Fichier téléversé avec succès');
            fetchFiles();
        } else {
            alert('Erreur lors du téléversement');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});

async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:3000/api/files');
        const data = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        data.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.innerHTML = `
                <p>${file.name} - ${file.description}</p>
                <button onclick="downloadFile('${file._id}')">Télécharger</button>
                <button onclick="deleteFile('${file._id}')">Supprimer</button>
            `;
            fileList.appendChild(fileElement);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function downloadFile(id) {
    window.open(`http://localhost:3000/api/files/${id}/download`);
}

async function deleteFile(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/files/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Fichier supprimé avec succès');
            fetchFiles();
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

fetchFiles();