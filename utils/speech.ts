let voices: SpeechSynthesisVoice[] = [];

const loadVoices = () => {
  voices = window.speechSynthesis.getVoices();
};

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

export const speakText = (text: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    alert('Ваш браузер не поддерживает озвучивание текста.');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const maleVoice = voices.find(voice => 
      voice.lang.startsWith('ru') && 
      (voice.name.includes('Male') || 
        voice.name.includes('Yuri') || 
        voice.name.includes('Dmitry') ||
        voice.name.includes('Eugene'))
  ) || voices.find(voice => voice.lang.startsWith('ru'));
  
  if (maleVoice) {
    utterance.voice = maleVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};