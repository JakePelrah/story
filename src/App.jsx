import React, { useEffect, useRef, useState } from 'react';
import LiveView from './LiveView/LiveView.jsx';
import Footer from './Footer/Footer.jsx'
import parser from './parser.jsx';
import Editor from './Editor.jsx';

const initialContent = `<p style="text-align: center;"><span style="font-size: 18pt;"><strong>[as]10,39</strong></span></p>
<p style="text-align: center;">&nbsp;</p>
<p id="characterf-Emma">Emma</p>
<p>[di]I brought you something.</p>
<p>[sd]She extends the package to him</p>
<p>[di]You&hellip; you left this last night. I thought you might need it.</p>
<p id="characterm-Bob">Bob</p>
<p id="audio-Blinding Light-12345">Blinding Light</p>
<p id="audiobg-Levitating-23456">Levitating</p>`

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [render, setRender] = useState(null)
  const [editorDoc, setEditorDoc] = useState(null)

  function syncScroll(source, target) {
    console.log(source.scrollTop, target.scrollTop)
    target.scrollTop = source.scrollTop
    // const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight);
    // target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
  }

  useEffect(() => {

    const liveView = document.getElementById('live-view');
    const editorScroll = editorDoc


    if (liveView && editorScroll) {

      // // Add event listeners to both divs
      liveView.addEventListener('scroll', function () {
        console.log(editorScroll.scrollTop, liveView.scrollTop)
        // editorScroll.scrollTop = liveView.scrollTop
        console.log('live')
      });
    }

    // console.log(scroll1, scroll2)

    // Function to sync scroll position




    // console.log(scroll2)



  }, [editorDoc])

  useEffect(() => {
    if (content) {
      setRender(parser(content))
    }
  }, [content])


  return (<>
    <div id="workspace" className='d-flex'>
      <Editor setEditorDoc={setEditorDoc} initialContent={initialContent} setContent={setContent} />
      <LiveView render={render} />
    </div>
    <Footer />
  </>
  );
}