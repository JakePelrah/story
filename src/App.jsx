import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react';
import Button from './Button.jsx'
import LiveView from './LiveView.jsx';
import Footer from './Footer.jsx'
import Sidebar from './Sidebar.jsx'


const initialContent =`<p style="text-align: center;">Scene 1</p>
<p>[ch]Emma</p>
<p>[di]I brought you something.</p>
<p><br>[sd]She extends the package to him</p>
<p><br>[di]You&hellip; you left this last night. I thought you might need it.</p>
<p>[ch]Bob</p>
<p>&nbsp;</p>
<p>&nbsp;</p>`

export default function App() {
  const editorRef = useRef(null)
  const [content, setContent] = useState(initialContent)
  const [render, setRender] = useState(null)


  useEffect(() => {

    if (content) {
      console.log(content)

      setRender(parse(content, {
        replace(domNode) {
         
           // if audio
           if (domNode.data?.startsWith('[au]')) {
            return <Button name={domNode.data.split('[au]')[1]} />;
            // return <div className='character'>{domNode.data.split('[au]')[1]}</div>
          }
          // if character
          if (domNode.data?.startsWith('[ch]')) {
            return <div className='character'>{domNode.data.split('[ch]')[1]}</div>
          }
          // if dialogue
          if (domNode.data?.startsWith('[di]')) {
            return <div className='dialogue'>{domNode.data.split('[di]')[1]}</div>
          }
          // if stage direction
          if (domNode.data?.startsWith('[sd]')) {
            console.log(domNode.data.split('[sd]'))
            return <div className='stage-direction'>(<span className='sd-dialogue'>{domNode.data.split('[sd]')[1]}</span>)</div>
          }
        },
      }))
    }

  }, [content])

  const specialChars = [
    { text: 'ch', value: '[ch]' },
    { text: 'au', value: '[au]' },
    { text: 'di', value: '[di]' },
    { text: 'au', value: '[au]' },


  ];
  return (<>

    <div id="workspace" className='d-flex'>
      {/* <Sidebar /> */}
      <Editor
        apiKey='yzuq4yobe1o1lzlt7l53yjbfls2694t8rh8opst94zzmct98'
        init={{
          statusbar: false,
          content_css: 'custom.css',
          // menubar: 'edit insert format',
          font_css: '../node_modules/bootstrap-icons/font/bootstrap-icons.css',
          // toolbar: 'tracks',
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],

          resize: false,
          setup: (editor) => {


            const onAction = (autocompleteApi, rng, value) => {
              editor.selection.setRng(rng);
              editor.insertContent(value);
              autocompleteApi.hide();
            };

            const getMatchedChars = (pattern) => {
              return specialChars.filter((char) => char.text.indexOf(pattern) !== -1);
            };

            /* An autocompleter that allows you to insert special characters */
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



            editor.on('input', () => setContent(editor.getContent()))
            // editorRef.current = editor

            // /* example, adding a toolbar menu button */
            // editor.ui.registry.addMenuButton('tracks', {
            //   text: 'Tracks',
            //   fetch: (callback) => {
            //     const items = [
            //       {
            //         type: 'menuitem',
            //         text: 'Track 1',
            //         onAction: () => {
            //           editor.insertContent('<div id="replace" data-name="testTrack" class="track">Track 1</div>')
            //         }
            //       },
            //     ];
            //     callback(items);
            //   }
            // });



          },
          plugins: [
            'anchor', 'autolink', 'code', 'image', 'link', 'media', 'visualblocks',

          ],
          // toolbar: 'tracks |undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          // exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
          // exportword_converter_options: { 'document': { 'size': 'Letter' } },
          // importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
        }}
      initialValue={initialContent}
      />

      <LiveView render={render} />
    </div>

    <Footer />
  </>
  );
}