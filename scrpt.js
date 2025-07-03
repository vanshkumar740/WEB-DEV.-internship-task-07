document.addEventListener('DOMContentLoaded', fetchUsers);
document.getElementById('reloadBtn').addEventListener('click', fetchUsers);

function fetchUsers() {
    const userContainer = document.getElementById('userContainer');
    userContainer.innerHTML = '<p>Loading...</p>';

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            userContainer.innerHTML = ''; // Clear loading message
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
                `;
                userContainer.appendChild(userCard);
            });
        })
        .catch(error => {
            userContainer.innerHTML = `<p class="error">Error fetching data: ${error.message}</p>`;
            console.error('Error:', error);
        });
}
