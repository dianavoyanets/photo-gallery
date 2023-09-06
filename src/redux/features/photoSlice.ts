import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadPhotoById } from "../actions/photo";
import { RejectedAction } from "../types";
import { fetchPhotoById } from "../../services/api";

interface PhotoState {
  photo: Photo | null;
  isLoading: boolean;
  error: string;
}

const initialState: PhotoState = {
  photo: null,
  loading: false,
  error: "",
};

export const loadPhotoById = createAsyncThunk(
  "photos/fetchPhotoById",
  async (id: string) => {
    return await fetchPhotoById(id);
  }
);

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPhotoById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.photo = action.payload;
      state.error = "";
    });
    builder.addCase(loadPhotoById.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(loadPhotoById.rejected, (state, action: RejectedAction) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default photoSlice.reducer;
