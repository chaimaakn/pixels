document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirect to login if no token found
        window.location.href = '/index.html';  // Replace with your login page path
        return;
    }

    // Example fetch request with token (replace with your API endpoints)
    try {
        const response = await fetch('http://localhost:5000/hallowdev/falseKnight', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
    }
});
