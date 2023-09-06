import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadPhotos } from "../actions/photos";
import { RejectedAction } from "../../types";
import { Photo, PhotoList, fetchPhotos } from "../../services/api";

interface PhotosState {
  photos: Photo[];
  total: number | null;
  isLoading: boolean;
  error: string;
  hasMore: boolean;
  page: number;
}

const initialState: PhotosState = {
  photos: [],
  total: null,
  isLoading: false,
  error: "",
  hasMore: true,
  page: 1,
};

export const loadPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (options: FetchPhotosOptions) => {
    return await fetchPhotos(options);
  }
);

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    reset: () => initialState,
    setPhotos: (state, action: PayloadAction<Photo[]>) => {
      state.photos = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.page = action.payload;
    },
  },
  extraReducers: {
    [loadPhotos.fulfilled.type]: (state, action: PayloadAction<PhotoList>) => {
      state.isLoading = false;

      if (state.page === 1) {
        state.photos = action.payload.photos;
      } else {
        state.photos = [...state.photos, ...action.payload.photos];
      }

      state.total = action.payload.total;

      if (
        state.photos.length === action.payload.total ||
        action.payload.photos.length === 0
      ) {
        state.hasMore = false;
      } else {
        state.page++;
      }
    },
    [loadPhotos.pending.type]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [loadPhotos.rejected.type]: (state, action: RejectedAction) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { setPhotos, setHasMore, setPage } = photosSlice.actions;
export default photosSlice.reducer;
