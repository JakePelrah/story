import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { settingsReducer, initialSettingsState } from "./Settings/settingsReducer"

const AudioManagerContext = createContext();
export const useAudioManager = () => useContext(AudioManagerContext)

export default function AudioManager({ children }) {
  const [offcanvas, setOffcanvas] = useState(null)
  const [settingsState, dispatchSettings] = useReducer(settingsReducer, initialSettingsState)
  const currentAudioRef = useRef(null)
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Assign to the ref
    audioContextRef.current = audioContext;


    // Cleanup function to close the audio context when the component unmounts
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        console.log("Audio context closed");
      }
    };
  }, []);


  useEffect(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.loop = settingsState.loop
      currentAudioRef.current.playbackRate = settingsState.playback_rate
    }
  }, [settingsState])


  function play(id, name) {
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    const myAudio = document.createElement('audio')
    myAudio.src = `audio/${name}_${id}`
    const source = audioContextRef.current.createMediaElementSource(myAudio);
    source.connect(audioContextRef.current.destination)
    myAudio.play()
    currentAudioRef.current = myAudio
  };


  function toggleSettings({ name, type, id }) {
    dispatchSettings({ type: 'SET_ID', payload: name })
    offcanvas.toggle()
  }

  return (
    <AudioManagerContext.Provider value={{
      play, setOffcanvas, toggleSettings, dispatchSettings, settingsState
    }}>
      {children}
    </AudioManagerContext.Provider>
  );
};