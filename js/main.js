console.log('JS файл подключен и выполняется');





//
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
        // Getting text from the text areas
        const text1 = document.getElementById('inp1').value;
        const text2 = document.getElementById('inp2').value;

        // Displaying the text in the output block
        const outputDiv = document.getElementById('output');
        outputDiv.innerText += `Слово: ${text1}\nПеревод: ${text2}\n\n`;

        // Clearing the text areas (if needed)
        //document.getElementById('inp1').value = '';
        //document.getElementById('inp2').value = '';
    });

    // Small setup to display indentation in the output
    const outputDiv = document.getElementById('output');
    outputDiv.style.whiteSpace = 'pre-line'; // To preserve line breaks
});

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('subscribe-popup');
    const closePopupButton = document.getElementById('close-popup');

    // Показать всплывающее окно
    popup.style.display = 'block';

    closePopupButton.onclick = function() {
        popup.style.display = 'none';
    };

    document.getElementById('subscribe-form').onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;

        // Отправка почты на сервер
        fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                alert('Подписка успешна!'); // Уведомление о завершении
                popup.style.display = 'none'; // Закрыть попап
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка. Попробуйте еще раз.');
            });
    };
});