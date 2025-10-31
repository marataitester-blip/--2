
export const parseMessage = (text: string): { cleanText: string; approaches: string[] } => {
  const approachMatch = text.match(/\[ПОДХОД:\s*([^\]]+)\]/);

  if (approachMatch) {
    const cleanText = text.replace(/\[ПОДХОД:[^\]]+\]/, '').trim();
    const approaches = approachMatch[1].split(',').map(a => a.trim());
    return { cleanText, approaches };
  }

  return { cleanText: text, approaches: [] };
};
