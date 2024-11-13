import { createContext, useContext,  useEffect, useRef } from "react";

const AudioManagerContext = createContext();
export const useAudioManager = () => useContext(AudioManagerContext)

export default function AudioManager({ children }) {
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


      const play = () => {
        const audioContext = audioContextRef.current;
    
        if (!audioContext) return;
    
        // Create an oscillator node (for sound generation)
        const oscillator = audioContext.createOscillator();
    
        // Set the oscillator's waveform to a square wave
        oscillator.type = 'square';
    
        // Set the frequency to 30 Hz
        oscillator.frequency.setValueAtTime(30, audioContext.currentTime);
    
        // Connect the oscillator to the destination (speakers)
        oscillator.connect(audioContext.destination);
    
        // Start the oscillator
        oscillator.start();
    
        // Stop the oscillator after 2 seconds (you can adjust this)
        oscillator.stop(audioContext.currentTime + 2);
    
        console.log('Playing 30 Hz square wave');
      };


    return (
        <AudioManagerContext.Provider value={{
            play
        }}>
            {children}
        </AudioManagerContext.Provider>
    );
};