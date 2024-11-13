import React, { useEffect, useRef, useState } from 'react';
import LiveView from './LiveView/LiveView.jsx';
import Footer from './Footer/Footer.jsx'
import parser from './parser.jsx';
import Editor from './Editor.jsx';

const initialContent = `<p style="text-align: center;"><span style="font-size: 18pt;"><strong>[as](1,1)</strong></span></p>
<p>[ch]Emma</p>
<p>[di]I brought you something.</p>
<p>[sd]She extends the package to him</p>
<p>[di]You&hellip; you left this last night. I thought you might need it.</p>
<p>[ch]Bob</p>
<div id="bl-122.wav" class="audio">Blinding Light</div>
<p>&nbsp;</p>`

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [render, setRender] = useState(null)


  useEffect(() => {
    if (content) {
      setRender(parser(content))
    }
  }, [content])

 
  return (<>
    <div id="workspace" className='d-flex'>
      <Editor initialContent={initialContent} setContent={setContent} />
      <LiveView render={render} />
    </div>
    <Footer />
  </>
  );
}