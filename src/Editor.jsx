import { Editor as TMCEEditor } from '@tinymce/tinymce-react';

export default function Editor({ initialContent, setContent }) {



    return (<TMCEEditor
        apiKey='yzuq4yobe1o1lzlt7l53yjbfls2694t8rh8opst94zzmct98'
        init={{
            statusbar: false,
            content_css: 'custom.css',
            font_css: '../node_modules/bootstrap-icons/font/bootstrap-icons.css',
            menubar: 'edit view format custom',
            toolbar: false,
            plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],

            resize: false,
            setup: (editor) => {

                // TODO Newline Bug
                editor.on("keydown", function (e) {
                    if (e.which == "13" || e.keyCode == "13") {
                        var selection = editor.selection;
                        var node = selection.getNode();
                        if (node.className === 'audio') {
                            e.preventDefault();
                            node.remove()
                            editor.insertContent(`${node.outerHTML}<br>`);

                        }
                    }
                });

                // update on format, bold, italics, etc...
                editor.on('FormatApply', () => setContent(editor.getContent()))
                editor.on('FormatRemove', () => setContent(editor.getContent()))

                tagCompleter(editor)
                audioCompleter(editor)

                editor.on('change', () => setContent(editor.getContent()))
                editor.on('input', () => setContent(editor.getContent()))

            },
            plugins: [
                'anchor', 'autolink', 'code', 'image', 'link', 'media', 'visualblocks',
            ],
        }}
        initialValue={initialContent}
    />
    )
}


function tagCompleter(editor) {

    const specialChars = [
        { text: 'character', value: '[ch]' },
        { text: 'dialogue', value: '[di]' },
        { text: 'stage direction', value: '[sd]' },
    ];

    const onAction = (autocompleteApi, rng, value) => {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
    };

    const getMatchedChars = (pattern) => {
        return specialChars.filter((char) => char.text.indexOf(pattern) !== -1);
    };

    editor.ui.registry.addAutocompleter('specialchars', {
        trigger: '[',
        minChars: 1,
        columns: 'auto',
        onAction: onAction,
        fetch: (pattern) => {
            return new Promise((resolve) => {
                const results = getMatchedChars(pattern).map((char) => ({
                    type: 'autocompleteitem',
                    value: char.value,
                    text: char.text,
                    icon: char.value
                }));
                resolve(results);
            });
        }
    });
}


function audioCompleter(editor) {

    const specialChars = [
        { text: 'Blinding Lights', value: { name: '<div class="audio" id="bl-122.wav">Blinding Light</div>', duration: 300 } },
        // { text: 'Levitating', value: '*levitating' },
        // { text: 'God\'s Plan', value: '*godsplan' },
        // { text: 'Bad Guy', value: '*badguy' },
        // { text: 'Thank U, Next', value: '*thankunext' },
        // { text: 'Shape of You', value: '*shapeofyou' },
        // { text: 'Truth Hurts', value: '*truthhurts' },
        // { text: 'HUMBLE.', value: '*humble' },
        // { text: 'Circles', value: '*circles' },
        // { text: 'Lover', value: '*lover' },
        // { text: 'Thriller', value: '*thriller' },
        // { text: 'Uptown Funk', value: '*uptownfunk' },
        // { text: 'Rolling in the Deep', value: '*rollinginthedeep' },
        // { text: 'Someone Like You', value: '*someonelikeyou' },
        // { text: 'Old Town Road', value: '*oldtownroad' },
        // { text: 'Smells Like Teen Spirit', value: '*smellsliketeenspirit' },
        // { text: 'Bohemian Rhapsody', value: '*bohemianrhapsody' },
        // { text: 'Shake It Off', value: '*shakeitoff' },
        // { text: 'All of Me', value: '*allofme' },
        // { text: 'Despacito', value: '*despacito' }
    ];

    const onAction = (autocompleteApi, rng, value) => {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
    };

    const getMatchedChars = (pattern) => {
        return specialChars.filter((char) => char.text.indexOf(pattern) !== -1);
    };

    editor.ui.registry.addAutocompleter('audioTitle', {
        trigger: '*au*',
        minChars: 1,
        columns: 1,
        highlightOn: ['char_name'],
        onAction: onAction,
        fetch: (pattern) => {
            return new Promise((resolve) => {
                const results = getMatchedChars(pattern).map((char) => ({
                    type: 'cardmenuitem',
                    value: char.value.name,
                    label: char.text,
                    items: [
                        {
                            type: 'cardcontainer',
                            direction: 'vertical',
                            items: [
                                {
                                    type: 'cardtext',
                                    text: char.text,
                                    name: 'char_name'
                                },
                                {
                                    type: 'cardtext',
                                    text: char.value.name
                                }
                            ]
                        }
                    ]
                }));
                resolve(results);
            });
        }
    });
}