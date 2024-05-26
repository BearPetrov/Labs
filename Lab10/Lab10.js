$(document).ready(function() {
    const dogList = $('#dog-list');
    const modal = $('#dog-modal');
    const modalContent = {
        image: $('#dog-image'),
        title: $('#dog-title'),
        sex: $('#dog-sex'),
        age: $('#dog-age'),
        description: $('#dog-description')
    };
    const closeModal = $('.close');

    $.get('https://usersdogs.dmytrominochkin.cloud/dogs', function(data) {
        data.forEach(dog => {
            const dogItem = $(`
                <div class="dog-item" data-id="${dog.id}">
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
                    <div>
                    <h3>${dog.title}</h3>
                    <p style="margin-top: 5px; font-size: 12px">${dog.sex}</p>
                    </div>
                </div>
            `);
            dogList.append(dogItem);
        });

        $('.dog-item').click(function() {
            const dogId = $(this).data('id');
            const dog = data.find(d => d.id === dogId);
            if (dog) {
                modalContent.image.attr('src', `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`);
                modalContent.title.text(dog.title);
                modalContent.sex.text(dog.sex);
                modalContent.age.text(dog.age);
                modalContent.description.text(dog.description);
                modal.show();
            }
        });
    });

    closeModal.click(function() {
        modal.hide();
    });

    $(window).click(function(event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });
});