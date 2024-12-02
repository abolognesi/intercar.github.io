$(window).scroll(function(){
    $('nav').toggleClass('bg-green', $(this).scrollTop() > 50);
  });

  $(document).ready(function () {
    $('#contactForm').on('submit', function (event) {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        const $form = $(this);
        const $submitButton = $('#submitButton');
        const $sendingMessage = $('#sendingMessage');
        const $responseMessage = $('#responseMessage');

        // Desactivar el botón y mostrar el mensaje de "Enviando..."
        $submitButton.prop('disabled', true);
        $sendingMessage.show();
        $responseMessage.hide(); // Ocultar mensajes anteriores

        const formData = $form.serialize();

        $.ajax({
            url: $form.attr('action'),
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                $sendingMessage.hide();
                $responseMessage
                    .removeClass('error')
                    .addClass('success')
                    .text(response.message)
                    .fadeIn();

                // Limpiar el formulario si el envío es exitoso
                if (response.message === 'Mensaje enviado con éxito.') {
                    $form[0].reset();
                }
            },
            error: function () {
                $sendingMessage.hide();
                $responseMessage
                    .removeClass('success')
                    .addClass('error')
                    .text('Error al enviar el mensaje. Inténtalo de nuevo.')
                    .fadeIn();
            },
            complete: function () {
                // Reactivar el botón independientemente del resultado
                $submitButton.prop('disabled', false);
            }
        });
    });
});