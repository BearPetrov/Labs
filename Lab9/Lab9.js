document.addEventListener('DOMContentLoaded', function() {
    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
        .then(response => response.json())
        .then(dogs => {
            const dogList = document.getElementById('dogList');
            dogs.forEach(dog => {
                const dogItem = document.createElement('li');
                dogItem.className = 'dog-item';
                dogItem.innerHTML = `
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                    <div>
                    <h3>${dog.title}</h3>
                    <p style="margin-top: 5px; font-size: 12px">${dog.sex}</p>
                    </div>
                `;
                dogItem.addEventListener('click', () => openModal(dog));
                dogList.appendChild(dogItem);
            });
        });
});

function openModal(dog) {
    document.getElementById('modalImage').src = `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`;
    document.getElementById('modalTitle').textContent = dog.title;
    document.getElementById('modalSex').textContent = dog.sex;
    document.getElementById('modalAge').textContent = dog.age;
    document.getElementById('modalDescription').textContent = dog.description;
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        closeModal();
    }
}
