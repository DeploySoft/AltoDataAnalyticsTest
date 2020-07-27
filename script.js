var items = ['Opt1', 'Opt2', 'Opt3'];
var itemsSelected = ['All'];

$(document).ready(function () {
        if (window.location.hash) {
            items = window.location.hash.substring(1).split("|");
        }
        Bar.init(items)
    }
);

Bar = {
    init: function (items) {
        $.each(items, function (k, v) {
            $('.items').append('<a id="' + v + '">' + v + '</a>');
        });
    }
};
