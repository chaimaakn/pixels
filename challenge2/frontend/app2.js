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

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
            alert('Fichier téléversé avec succès');
            fetchFiles();
        } else {
            //alert('Erreur lors du téléversement: ' + data.message);
        }
    } catch (error) {
        //alert('Erreur lors du téléversement: ' + error.message);
        console.error('Erreur:', error);
    }
});

async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:3000/api/list');
        const data = await response.json();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        data.data.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.innerHTML = `
                <p>${file}</p>
                <button onclick="downloadFile('${file}')">Télécharger</button>
                <button onclick="deleteFile('${file}')">Supprimer</button>
            `;
            fileList.appendChild(fileElement);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function downloadFile(fileName) {
    window.open(`http://localhost:3000/api/files/${fileName}/download`);
}

async function deleteFile(fileName) {
    try {
        const response = await fetch(`http://localhost:3000/api/files/${fileName}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Fichier supprimé avec succès');
            fetchFiles();
        } else {
            alert('Erreur lors de la suppression: ' + data.message);
        }
    } catch (error) {
        alert('Erreur lors de la suppression: ' + error.message);
        console.error('Erreur:', error);
    }
}
function createFileElement(file) {
    const fileElement = document.createElement('div');
    fileElement.className = 'file-item';
    fileElement.innerHTML = `
        <p>${file.name} - ${file.description}</p>
        <button onclick="downloadFile('${file._id}')">Télécharger</button>
        <button onclick="deleteFile('${file._id}')">Supprimer</button>
    `;
    return fileElement;
}
fetchFiles();
