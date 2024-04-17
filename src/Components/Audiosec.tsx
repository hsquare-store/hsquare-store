import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const Audiosec: React.FC = () => {
    // Initialize an audio reference
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // State to track whether the audio is playing or paused
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Function to handle button click
    const handleButtonClick = () => {
        // Check if audioRef.current is not null before manipulating the audio element
        if (audioRef.current) {
            if (isPlaying) {
                // Pause the audio if it is currently playing
                audioRef.current.pause();
            } else {
                // Play the audio if it is currently paused
                audioRef.current.play();
            }
            // Toggle the isPlaying state
            setIsPlaying(!isPlaying);
        }
    };

    // UseEffect to handle side effects
    useEffect(() => {
        // This effect can be used to perform any side effects when the isPlaying state changes
        // For example, you could log the state change or update other components

        // Copy the value of audioRef.current to a variable
        const currentAudioRef = audioRef.current;

        // Clean up function to handle any necessary cleanup when the component unmounts
        return () => {
            // If audio is still playing, pause it when the component unmounts
            if (currentAudioRef && !currentAudioRef.paused) {
                currentAudioRef.pause();
            }
        };
    }, [isPlaying]);

    return (
        <div  className='w-full h-[30vh] flex justify-center items-center'>
            <div onClick={handleButtonClick} className='relative w-[95%] h-[95%] rounded-2xl flex justify-center items-center'>
                <Image width={100} height={100} src="https://lcijfvbkpbywioawgsyj.supabase.co/storage/v1/object/public/files/Screenshot%202024-04-17%20131316%20(1).png" alt="" className='w-full h-full' />
                <audio ref={audioRef} src="https://lcijfvbkpbywioawgsyj.supabase.co/storage/v1/object/public/files/sample-3s.mp3" typeof="audio/mp3">
    Your browser does not support the audio element.
</audio>
                
            </div>
        </div>
    );
};

export default Audiosec;
