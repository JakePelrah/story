import { useEffect, useRef } from "react"
import { useAudioManager } from "../AudioManager"
import { Offcanvas } from "bootstrap"
import Equalizer from "../Equalizer/Equalizer"

export default function Settings() {
    const { setOffcanvas, settingsState, dispatchSettings } = useAudioManager()
    const settingsRef = useRef(null)


    useEffect(() => {
        setOffcanvas(new Offcanvas(settingsRef.current))
    }, [])


    function save() {
        fetch('http://localhost:3000/audioSettings', {
            method: 'POST',
            body: JSON.stringify(settingsState),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    return (
        <div ref={settingsRef} class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">

            <div class="d-flex justify-content-between offcanvas-body small">

                <div>
                    
                    <h5>{settingsState.id}</h5>

                    <div class="form-check">
                        <input onChange={(e) => dispatchSettings({ type: 'SET_LOOP', payload: e.target.checked })}
                            class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Loop
                        </label>
                    </div>

                    <label class="form-check-label" for="flexCheckDefault">
                        Reverb
                    </label>
                    <select class="
                    form-select" aria-label="Default select example">
                        <option value=''>-</option>
                        <option value="1">Hall</option>
                        <option value="2">Church</option>
                        <option value="3">Bathroom</option>
                    </select>

                    <label class="form-check-label" for="flexCheckDefault">
                        Audio Type
                    </label>
                    <select class="
                    form-select" >
                        <option value=''>-</option>
                        <option value="1">Background</option>
                        <option value="2">Sound</option>
                    </select>


                </div>

                <Equalizer />

                <div className="ms-5 d-flex flex-column">

                    <div>
                        <label for="customRange1" class="form-label">Playback Rate</label>
                        <input min={0} max={16} step={0.1} onChange={(e) => dispatchSettings({ type: 'SET_PLAYBACK_RATE', payload: e.target.value })}
                            type="range" class="form-range" id="customRange1" />
                    </div>
                    <div>
                        <label for="customRange1" class="form-label">Gain</label>
                        <input onChange={(e) => dispatchSettings({ type: 'SET_PLAYBACK_RATE', payload: e.target.value })}
                            type="range" class="form-range" id="customRange1" />
                    </div>
                    <div>
                        <label for="customRange1" class="form-label">Pan</label>
                        <input onChange={(e) => dispatchSettings({ type: 'SET_PLAYBACK_RATE', payload: e.target.value })}
                            type="range" class="form-range" id="customRange1" />
                    </div>

                </div>




            </div>

            <button onClick={save} >Save</button>
        </div>
    )
}