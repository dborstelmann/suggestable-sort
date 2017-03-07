(function () {
    /*
        Suggestable-sort is a library aimed at frustrated web devs.
        My goal with this library is to create a developer friendly,
        robust yet simple, and lightweight library that allows devs
        to create inputs that are a combination of a typeahead, a
        multiple select, and a sortable.

        Options: {
            target: '#selector',
            data: [] // Array of json objects for populating the typeahead
                (empty list allows for free input of sortable)
                Required Values:
                    value, label
            sortable: false (default is true),
            template: '<div>Custom HTML for typeahead</div> (Use underscore?)',
            freeInput: false (default is true) allow free entries to sortable list
        }
    }
    */
    _.templateSettings = {
        evaluate: /\{\{#(.+?)\}\}/g,
        interpolate: /\{\{=(.+?)\}\}/g,
        escape: /\{\{(?!#|=)(.+?)\}\}/g
    };

    var suggestableTemplate = _.template(
        '<div class="ss">' +
            '<input id="ss-input" type="text" placeholder="{{placeholder}}">' +
            '{{# if (freeInput) { }}<button id="ss-add-free">+</button>{{# } }}' +
            '<div id="ss-selected-list"></div>' +
        '</div>'
        )

    window.suggestableSort = function (options) {
        var addSuggestion = function () {
            var list = document.getElementById('ss-selected-list'),
                input = document.getElementById('ss-input');

            if (input.value.length > 0) {
                list.insertAdjacentHTML('beforeend', main.template({value: input.value, label: input.value}));
                Sortable.create(list);
            }
        }

        var functions = {
            initSuggestable: function (main) {
                return suggestableTemplate(main);
            },
            freeInputSetup: function () {
                document.getElementById('ss-add-free').onclick = addSuggestion;
            },
            initSortable: function () {

            },
            allowFreeInput: function () {

            },
            initBloodhound: function () {

            },
        }

        var main = {
            data: [],
            sortable: true,
            template: '<div data-value="{{value}}">{{label}}</div>',
            freeInput: true,
            placeholder: ''
        };

        if ('sortable' in options && options.sortable === false) {
            main.sortable = false;
        }
        if ('freeInput' in options && options.freeInput === false) {
            main.freeInput = false;
        }
        if ('data' in options && options.data.constructor === Array) {
            main.data = options.data;
        }
        if ('template' in options && typeof options.template === 'string') {
            main.template = options.template;
        }
        if ('placeholder' in options && typeof options.placeholder === 'string') {
            main.placeholder = options.placeholder;
        }
        main.template = _.template(main.template);

        if (!('target' in options) || ('target' in options && typeof options.target !== 'string')) {
            console.log('Must pass id of html element for suggestable-sort to place itself in.');
            return;
        }
        main.target = document.getElementById(options.target);

        var el = functions.initSuggestable(main);

        main.target.innerHTML = el;

        if (main.freeInput) {
            functions.freeInputSetup();
        }

        if (main.sortable) {
            functions.initSortable();
        }
    }
})();
