document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navegation a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Eliminar la clase 'active' de todos los enlaces
            links.forEach(link => {
                link.classList.remove('active');
            });

            // Agregar la clase 'active' al enlace actual
            this.classList.add('active');
        });
    });
});
