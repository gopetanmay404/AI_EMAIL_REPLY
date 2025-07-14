// import { useState } from 'react'
// import './App.css'
// import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import axios from 'axios';

// function App() {
//   const [emailContent, setEmailContent] = useState('');
//   const [tone, setTone] = useState('');
//   const [generatedReply, setGeneratedReply] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post("http://localhost:8080/api/email/generate", {
//        emailContent,
//        tone 
//       });
//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     } catch (error) {
//       setError('Failed to generate eamil reply. Please try again');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Container maxWidth="md" sx={{py:4}}>
//       <Typography variant='h3' component="h1" gutterBottom>
//         Email Reply Generator
//       </Typography>

//       <Box sx={{ mx: 3 }}>
//         <TextField 
//           fullWidth
//           multiline
//           rows={6}
//           variant='outlined'
//           label="Original Email Content"
//           value={emailContent || ''}
//           onChange={(e) => setEmailContent(e.target.value)}
//           sx={{ mb:2 }}/>

//           <FormControl fullWidth sx={{ mb:2 }}>
//             <InputLabel>Tone (Optional)</InputLabel>
//             <Select
//               value={tone || ''}
//               label={"Tone (Optional)"}
//               onChange={(e) => setTone(e.target.value)}>
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="professional">Professional</MenuItem>
//                 <MenuItem value="casual">Casual</MenuItem>
//                 <MenuItem value="friendly">Friendly</MenuItem>
//             </Select>
//           </FormControl>

//           <Button
//             variant='contained'
//             onClick={handleSubmit}
//             disabled={!emailContent || loading}
//             fullWidth>
//             {loading ? <CircularProgress size={24}/> : "Generate Reply"}
//           </Button>
//       </Box>

//       {error && (
//         <Typography color='error' sx={{ mb:2 }}>
//           {error}
//         </Typography>
//       )}

//       {generatedReply && (
//        <Box sx={{ mt: 3}}>
//           <Typography variant='h6' gutterBottom>
//             Generated Reply:
//           </Typography>
//           <TextField
//             fullWidth
//             multiline
//             rows={6}
//             variant='outlined'
//             value={generatedReply || ''}
//             inputProps={{ readOnly: true }}/>
        
//         <Button
//           variant='outlined'
//           sx={{ mt: 2 }}
//           onClick={() => navigator.clipboard.writeText(generatedReply)}>
//             Copy to Clipboard
//         </Button>
//        </Box> 
//       )}
//     </Container>
//   )
// }

// export default App














import { useState } from 'react';
import './App.css';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

//   const handleVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Your browser doesn't support voice recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     let finalTranscript = "";

//     recognition.onstart = () => {
//       alert("🎙 Speak now...");
//     };

//     recognition.onresult = (event) => {
//       finalTranscript = event.results[0][0].transcript;
//       setEmailContent(finalTranscript);
//     };

//     recognition.onerror = (e) => {
//       alert("Mic error: " + e.error);
//     };

//     recognition.onend = () => {
//   if (!finalTranscript.trim()) return;

//   // ⏱ Delay before calling backend
//   setTimeout(async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.post("http://localhost:8080/api/email/generate", {
//         emailContent: finalTranscript.trim(),
//         tone: tone || "friendly"
//       });
//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     } catch (error) {
//       setError("Voice input failed. Try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }, 1200); // 1.2 second delay
// };

//     recognition.start();
//     setTimeout(() => recognition.stop(), 10000);
//   };











// This is Latest one 

// const handleVoiceInput = () => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     alert("Your browser doesn't support voice recognition.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = 'en-US';
//   recognition.continuous = true; // allow multi-sentence
//   recognition.interimResults = false;

//   let finalTranscript = "";

//   recognition.onstart = () => {
//     alert("🎤 Speak now... (auto-detects pause)");
//   };

//   recognition.onresult = (event) => {
//     for (let i = event.resultIndex; i < event.results.length; ++i) {
//       if (event.results[i].isFinal) {
//         finalTranscript += event.results[i][0].transcript + " ";
//       }
//     }

//     setEmailContent(finalTranscript.trim());
//   };

//   recognition.onerror = (e) => {
//     alert("Mic error: " + e.error);
//   };

//   recognition.onspeechend = async () => {
//     recognition.stop(); // 🛑 stop after 4–5 sec pause
//     if (!finalTranscript.trim()) return;

//     try {
//       setLoading(true);
//       setError('');
//       const response = await axios.post("http://localhost:8080/api/email/generate", {
//         emailContent: finalTranscript.trim(),
//         tone: tone || "friendly"
//       });
//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     } catch (error) {
//       setError("Voice input failed. Try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   recognition.start();
// };








const handleVoiceInput = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser doesn't support voice recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;

  let finalTranscript = "";
  let countdownTimer = null;
  let countdownValue = 5;

  const startCountdown = () => {
    clearInterval(countdownTimer);
    countdownValue = 5;

    countdownTimer = setInterval(() => {
      console.log(`⏳ Generating in: ${countdownValue}`);
      if (countdownValue === 0) {
        clearInterval(countdownTimer);
        triggerBackend(finalTranscript.trim());
      } else {
        countdownValue--;
      }
    }, 1000);
  };

  const resetCountdown = () => {
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownValue = 5;
    }
  };

  const triggerBackend = async (text) => {
    if (!text) return;
    try {
      setLoading(true);
      setError('');
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent: text,
        tone: tone?.trim() ? tone : "friendly"
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError("Voice input failed. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  recognition.onstart = () => {
    alert("🎤 Speak now...");
  };

  recognition.onresult = (event) => {
    resetCountdown(); // because user spoke again

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
    }

    setEmailContent(finalTranscript.trim());

    // Start countdown after small pause
    startCountdown();
  };

  recognition.onerror = (e) => {
    alert("Mic error: " + e.error);
  };

  recognition.onend = () => {
    console.log("Recognition ended.");
    // if countdown still running, let it finish
  };

  recognition.start();
};






// const handleVoiceInput = () => {
//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     alert("Your browser doesn't support voice recognition.");
//     return;
//   }

//   const recognition = new SpeechRecognition();
//   recognition.lang = 'hi-IN'; // Any default (doesn’t matter now)
//   recognition.continuous = true;
//   recognition.interimResults = false;

//   let finalTranscript = "";

//   recognition.onstart = () => {
//     alert("🎙 Speak in any language...");
//   };

//   recognition.onresult = (event) => {
//     for (let i = event.resultIndex; i < event.results.length; ++i) {
//       if (event.results[i].isFinal) {
//         finalTranscript += event.results[i][0].transcript + " ";
//       }
//     }

//     setEmailContent(finalTranscript); // Show original spoken text
//   };

//   recognition.onerror = (e) => {
//     alert("Mic error: " + e.error);
//   };

//   recognition.onend = async () => {
//     if (!finalTranscript.trim()) return;

//     try {
//       setLoading(true);
//       setError('');
      
//       // 🧠 Detect Language First
//       const detectResponse = await axios.post('https://libretranslate.com/detect', {
//         q: finalTranscript
//       });
//       const detectedLang = detectResponse.data[0]?.language || 'en';

//       // 🌐 If not English, translate
//       let translatedText = finalTranscript;
//       if (detectedLang !== 'en') {
//         const translateResponse = await axios.post('https://libretranslate.com/translate', {
//           q: finalTranscript,
//           source: detectedLang,
//           target: 'en',
//           format: 'text'
//         });
//         translatedText = translateResponse.data.translatedText;
//       }

//       // 📨 Now send translated to backend
//       const response = await axios.post("http://localhost:8080/api/email/generate", {
//         emailContent: translatedText,
//         tone: tone || "friendly"
//       });

//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     } catch (error) {
//       setError("Voice input failed. Try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   recognition.start();

  // ⏱ Auto stop after 10 seconds
//};





  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleVoiceInput}
        >
          🎤 Speak
        </Button>

        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth>
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}
          />
          <Button
            variant='outlined'
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}
export default App;








