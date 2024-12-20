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
AOS.init();
document.querySelectorAll('.offcanvas a.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        link.classList.add('active');
        // Cerrar el offcanvas
      const offcanvas = document.querySelector('.offcanvas.show');
      if (offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
        bsOffcanvas.hide();
      }
      
      // Moverse al ID correspondiente
      const target = this.getAttribute('href');
      if (target.startsWith('#')) {
        event.preventDefault(); // Evitar el comportamiento predeterminado
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Scroll suave
        }
      }
    });
  });

  // Obtener todos los enlaces de navegación
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Escuchar el evento de desplazamiento
window.addEventListener('scroll', () => {
  let current = '';
  
  // Iterar sobre cada enlace
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    // Comprobar si la sección está en la ventana del navegador
    if (section.offsetTop <= window.scrollY + 100 && section.offsetTop + section.offsetHeight > window.scrollY + 100) {
      current = link.getAttribute('href'); // Establecer el enlace actual
    }
  });

  // Añadir la clase 'active' al enlace correspondiente
  navLinks.forEach(link => {
    link.classList.remove('active'); // Eliminar 'active' de todos los enlaces
    if (link.getAttribute('href') === current) {
      link.classList.add('active'); // Añadir 'active' al enlace actual
    }
  });
});