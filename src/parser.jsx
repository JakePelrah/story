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
      if (domNode.attribs && domNode.attribs?.id?.startsWith('audio')) {
        const [type, value, id] = domNode.attribs.id.split('-')
        return <Button type="audio" id={id} name={value || ''} />;
      }

      // if stage direction
      if (domNode.data?.startsWith('[as]')) {
        const pattern = /(\d+),(\d+)/;
        const match = domNode.data.match(pattern);
        if (match) {
          const act = match[1];
          const scence = match[2];
          return <div className='dialogue'>{`Act ${act} Scene ${scence}`}</div>
        }
      }
    },
  })
}