import parse from 'html-react-parser'
import Button from './Button/Button';

export const parserRules = {


}


export default function parser(content) {

 return parse(content, {

    replace(domNode) {
   
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

      // if audio
      if (domNode.attribs && domNode.attribs.class === 'audio') {
        return <Button type="audio" name={domNode.attribs.id || ''} />;
      }

      // if stage direction
      if (domNode.data?.startsWith('[as]')) {
        const [a, s] = domNode.data.split('[as]')[1].slice(1, -1).split(',');
        return <div className='dialogue'>{`Act ${a} Scene ${s}`}</div>
      }
    },
  })
}