import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react';
import Button from './Button/Button.jsx'
import LiveView from './LiveView/LiveView.jsx';
import Footer from './Footer/Footer.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'

const initialContent = `<p style="text-align: center;"><span style="font-size: 18pt;"><strong>[as](1,1)</strong></span></p>
<p>[ch]Emma</p>
<p>[di]I brought you something.</p>
<p>[sd]She extends the package to him</p>
<p>[di]You&hellip; you left this last night. I thought you might need it.</p>
<p>[ch]Bob</p>
<p>[audiobg]BG Audio</p>
<p>[audio]Audio</p>
<p>&nbsp;</p>
<p>&nbsp;</p>`

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [render, setRender] = useState(null)


  useEffect(() => {

    if (content) {

      setRender(parse(content, {
        replace(domNode) {

          // if audio
          if (domNode.data?.startsWith('[au]')) {
            return <Button name={domNode.data.split('[au]')[1]} />;
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
            return <div className='stage-direction'>(<span className='sd-dialogue'>{domNode.data.split('[sd]')[1]}</span>)</div>
          }

          // if stage direction
          if (domNode.data?.startsWith('[audiobg]')) {
            return <Button type="audiobg" name={domNode.data?.split('[audiobg]')?.[1] || ''} />;
          }

          // if stage direction
          if (domNode.data?.startsWith('[audio]')) {
            return <Button type="audio" name={domNode.data?.split('[audio]')?.[1] || ''} />;
          }

          // if stage direction
          if (domNode.data?.startsWith('[as]')) {
            const [a, s] = domNode.data.split('[as]')[1].slice(1, -1).split(',');
            return <div className='dialogue'>{`Act ${a} Scene ${s}`}</div>
          }

        },
      }))
    }

  }, [content])

  const specialChars = [
    { text: 'ch', value: '[ch]' },
    { text: 'au', value: '[au]' },
    { text: 'di', value: '[di]' },
  ];

  return (<>

    <div id="workspace" className='d-flex'>
      <Sidebar />
      <Editor
        apiKey='yzuq4yobe1o1lzlt7l53yjbfls2694t8rh8opst94zzmct98'
        init={{
          statusbar: false,
          content_css: 'custom.css',
          font_css: '../node_modules/bootstrap-icons/font/bootstrap-icons.css',
          menu: {
            custom: {
              title: 'Audio',
              items: 'myCustomMenuItem'
            }
          },
          menubar: 'edit view format custom',
          toolbar: false,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],

          resize: false,
          setup: (editor) => {

            // var newColor = document.createElement("style");
            // document.head.appendChild(newColor);
            // newColor.sheet.insertRule(".tox-edit-area__iframe {background-color: blue !important}");

            

            editor.ui.registry.addMenuItem('myCustomMenuItem', {
              text: 'My Custom Menu Item',
              onAction: () => {
                editor.insertContent('[audiobg]BG Audio')
                setContent(editor.getContent())
              }
            });


            editor.on('FormatApply', () => setContent(editor.getContent()))
            editor.on('FormatRemove', () => setContent(editor.getContent()))


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
          // exportpdf_converter_options: {'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
          // exportword_converter_options: {'document': {'size': 'Letter' } },
          // importword_converter_options: {'formatting': {'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
        }}
        initialValue={initialContent}
      />

      <LiveView render={render} />
    </div>

    <Footer />
  </>
  );
}