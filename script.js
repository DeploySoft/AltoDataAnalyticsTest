var items = ['Opt1', 'Opt2', 'Opt3'];
var itemsSelected = [];
var itemsActive = [];
var currentBars = [];
var bar, content;

$(document).ready(function () {
        if (window.location.hash) {
            items = window.location.hash.substring(1).split("|");
            if (items.length < 3) {
                alert("Really ?  You need at least 3 params");
            }
            items = ['Opt1', 'Opt2', 'Opt3'];
        }
        YoutubeBar.init(items);
        YoutubeBar.content.init($('#values'));
        YoutubeBar.progressBar.init($('#progress-bar'));
    }
);

YoutubeBar = {
    init: function (items) {
        $.each(items, function (k, v) {
            var item = $('<a id="' + v + '">' + v + '</a>');
            $('.items').append(item);
            YoutubeBar.items.init(item);
        });
    },
    progressBar: {
        init: function (dom) {
            bar = dom;
            this.update(0);
            this.delay();
        },
        update: function (val) {
            bar.width(val + '%');
            if (val === 100) {
                YoutubeBar.content.refresh(itemsActive);
                YoutubeBar.progressBar.clear();
            }
        },
        delay: function () {
            for (var i = 0; i <= 100; i++) {
                currentBars.push(setTimeout(this.update.bind(this.update, i), i * 30));
            }
        },
        clear: function () {
            $.each(currentBars, function (index, value) {
                clearTimeout(value);
            });
            this.update(0);
        }
    },
    content: {
        init: function (dom) {
            content = dom;
            dom.text("");
            itemsActive = items;
        },
        refresh: function (items) {
            content.text(items.join(','));
        }
    },
    items: {
        init: function (dom) {
            dom.bind('click', this.select);
        },
        clear: function () {
            $.each(itemsSelected, function (index, value) {
                $('#' + value).removeClass('active');
            });
        },
        select: function () {
            $(this).toggleClass('active');
            YoutubeBar.progressBar.clear();
            YoutubeBar.progressBar.delay();
            YoutubeBar.items.checkLogic($(this).attr("id"));
        },
        checkLogic: function (id) {
            $("#all").removeClass("active");
            var index = $.inArray(id, itemsSelected);
            if (index > -1) {
                itemsSelected.splice(index, 1);
            } else {
                itemsSelected.push(id);
            }
            itemsActive = itemsSelected;
            if (items.length === itemsSelected.length) {
                $("#all").addClass("active");
                this.clear();
                itemsSelected = [];
            }

        }
    }
};
