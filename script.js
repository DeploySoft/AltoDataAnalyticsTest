var items = ['Opt1', 'Opt2', 'Opt3'];
var itemsSelected = ['All'];
var progressBar, content;
$(document).ready(function () {

        if (window.location.hash) {
            items = window.location.hash.substring(1).split("|");
        }

        YoutubeBar.init(items);
        YoutubeBar.content.init($('#values'));
        YoutubeBar.progressBar.init($('#progress-bar'));

    }
);


YoutubeBar = {
    init: function (items) {
        $.each(items, function (k, v) {
            $('.items').append('<a id="' + v + '">' + v + '</a>');
        });
    },
    progressBar: {
        init: function (dom) {
            progressBar = dom;
            this.updateStatus(0);
            this.delay();
        },
        updateStatus: function (val) {
            progressBar.width(val + '%');
            if (val === 100) {
                YoutubeBar.content.refresh();
            }
        },
        delay: function () {
            for (var i = 0; i <= 100; i++) {
                setTimeout(this.updateStatus.bind(this.updateStatus, i), i * 30);
            }
        }
    },
    content: {
        init: function (dom) {
            content = dom;
            dom.text("");
        },
        refresh: function () {
            //TODO LOGIC HERE
            content.text("test");
        }
    },
};
