function loadPartialView(viewName, divClass = null, isAppend) {
    $.ajax({
        url: viewName + '.html',
        method: 'GET',
        success: function(data) {
            divClass === null ? console.error('Elemento contenedor (divClass) no definido') : (isAppend ? $(divClass).append(data) : $(divClass).html(data));
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la vista parcial:', error);
        }
    });
}