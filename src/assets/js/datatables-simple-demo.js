// Simple-DataTables
// https://github.com/fiduswriter/Simple-DataTables/wiki


window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        const dataTable = new simpleDatatables.DataTable(datatablesSimple, {
            labels: {
                placeholder: "Buscar...",
                perPage: "Registros por página",
                noRows: "No se encontraron registros",
                info: "Mostrando {start} a {end} de {rows} registros",
                loading: "Cargando...",
                infoFiltered: "(filtrado de {rowsTotal} registros totales)",
                previous: "Anterior",
                next: "Siguiente"
            }
        });

        // Aquí puedes personalizar el select manualmente después de la creación
        const selectElement = document.querySelector('.dataTable-selector');
        if (selectElement) {
            selectElement.insertAdjacentHTML('beforebegin', 'Mostrar ');
            selectElement.insertAdjacentHTML('afterend', ' registros por página');
        }
    }
});

