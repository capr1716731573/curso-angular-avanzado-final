// Theme color settings
$(document).ready(function() {
    function store(name, val) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
    $("*[data-theme]").click(function(e) {
        e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        store('theme', currentStyle);
        $('#theme').attr({ href: 'css/colors/' + currentStyle + '.css' })
    });

    var currentTheme = get('theme');
    if (currentTheme) {
        $('#theme').attr({ href: 'css/colors/' + currentTheme + '.css' });
    }
    // color selector
    $('#themecolors').on('click', 'a', function() {
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working')
    });

});

function get(name) {

}

$(document).ready(function() {
    //creo store 2 xq me sale error en el cambio de tema
    function store(name, val) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }
    $("*[data-theme]").click(function(e) {
        e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        store('theme', currentStyle);
        $('#theme').attr({ href: 'css/colors/' + currentStyle + '.css' })
    });

    var currentTheme = get('theme');
    if (currentTheme) {
        $('#theme').attr({ href: 'css/colors/' + currentTheme + '.css' });
    }
    // color selector
    $('#themecolors').on('click', 'a', function() {
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working')
    });


    $("*[data-theme]").click(function(e) {
        e.preventDefault();
        var currentStyle = $(this).attr('data-theme');
        store('theme', currentStyle);
        $('#theme').attr({ href: 'css/colors/' + currentStyle + '.css' })
    });

    var currentTheme = get('theme');
    if (currentTheme) {
        $('#theme').attr({ href: 'css/colors/' + currentTheme + '.css' });
    }
    // color selector
    $('#themecolors').on('click', 'a', function() {
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working')
    });
});