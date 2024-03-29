import { Dispatch, SetStateAction } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

interface Props {
  audioUrl: string | null;
  setAudioUrl: Dispatch<SetStateAction<string | null>>;
}

const VoiceRecorder = ({ audioUrl, setAudioUrl }: Props) => {

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
      <br />
      {audioUrl && (
        <audio key={audioUrl} controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </>
  );
};

export default VoiceRecorder;
