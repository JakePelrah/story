import { useEffect, useRef } from "react"
import * as noUiSlider from 'nouislider';
import './equalizer.css'

export default function Equalizer() {
    const slidersRef = useRef([])


    useEffect(() => {

        console.log(slidersRef.current)
        slidersRef.current.map(slider => {
            noUiSlider.create(slider, {
                start: 50,
                orientation: 'vertical',
                connect: true,
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        })

    }, [])


    const renderSlider = [...Array(9).keys()].map((_, i) =>
        <div className="slider-fit" ref={(element) => slidersRef.current.push(element)} id={`slider-${i}`}></div>
    )


    return (
        <div id="equalizer" className="d-flex justify-content-between m-2">
            {renderSlider}
        </div>
    )
}