import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import wordService from "../../services/api/routes/words";
import Word from "../../types/models/Word";
import GetWordChoicesInput from "../../types/inputs/word/GetWordChoicesInput";
import UpdateWordStateInput from "../../types/inputs/word/UpdateWordStateInput";


interface StudySessionState {
  availableWords: Word[];
  choices: Word[];
  currentQuestionIdx?: number;
}

const initialState: StudySessionState = {
  availableWords: [],
  choices: [],
  currentQuestionIdx: undefined,
}

const fetchAvailableWords = createAsyncThunk(
  'studySession/fetchAll',
  async (dictionaryid: number) => {
    const response = await wordService.getAvailable(dictionaryid);
    return response.data;
  }
);

const fetchNextQuestion = createAsyncThunk(
  'studySession/fetchNextQuestion',
  async ({ dictionaryid, wordid }: GetWordChoicesInput) => {
    const response = await wordService.getChoices(dictionaryid, wordid);
    return response.data;
  }
);

const updateWordState = createAsyncThunk(
  'studySession/updateWordState',
  async (data: UpdateWordStateInput) => {
    const response = await wordService.updateWordState(data);
    return response.data;
  }
)

const studySessionSlice = createSlice({
  name: "studySession",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.availableWords = [];
      state.choices = [];
      state.currentQuestionIdx = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableWords.fulfilled, (state, action: PayloadAction<Word[]>) => {
      state.availableWords = action.payload;
    });

    builder.addCase(fetchNextQuestion.fulfilled, (state, action: PayloadAction<Word[]>) => {
      state.choices = action.payload;
      if (state.currentQuestionIdx !== undefined && state.currentQuestionIdx < state.availableWords.length) {
        console.log("increment")
        state.currentQuestionIdx = state.currentQuestionIdx + 1;
        console.log(state.currentQuestionIdx)
      } else {
        console.log("start");
        state.currentQuestionIdx = 0;
      }
    });
  }
});

export const {
  clearSession,
} = studySessionSlice.actions;

export {
  fetchAvailableWords,
  fetchNextQuestion,
  updateWordState,
};

export default studySessionSlice.reducer;