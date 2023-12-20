import React, { useState } from "react";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid
} from "@mui/material";

const CreateWord = () => {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [audioFileName, setAudioFileName] = useState<string>("");

  const handleCreate = () => {
    const phrasesTextField = document.getElementById("phrases") as HTMLInputElement;
    const phrase = phrasesTextField.value;
    setPhrases((prevPhrases) => [...prevPhrases, phrase]);
    phrasesTextField.value = "";
  };

  const handleDelete = (index: number) => {
    setPhrases((prevPhrases) => prevPhrases.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFileName(file.name);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box m={2}>
        <Typography variant="h6" gutterBottom>
          Create/edit riječ
        </Typography>
      </Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="word"
              label="Riječ"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="translation"
              label="Prijevod"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  id="phrases"
                  label="Fraze"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleCreate}>
                  create
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {phrases.map((phrase, index) => (
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs key={index}>
                  <TextField
                    fullWidth
                    value={phrase}
                    variant="outlined"
                    disabled
                    id={`phrase${index}`}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => handleDelete(index)}>
                    delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <TextField
                  fullWidth
                  id="audio"
                  label={audioFileName || "Audio"}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item>
                <Button variant="contained" component="label">
                  upload
                  <input type="file" hidden onChange={handleFileUpload} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="space-around">
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth>
                  odustani
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  potvrdi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateWord;