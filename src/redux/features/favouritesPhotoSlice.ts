import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favoritePhotoIds";

interface FavouritesPhotoState {
  favoritePhotoIds: string[];
}

const initialState: FavouritesPhotoState = {
  favoritePhotoIds: JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) || "[]"
  ),
};

export const favouritesPhotoSlice = createSlice({
  name: "favouritesPhoto",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoritePhotoIds.includes(action.payload)) {
        state.favoritePhotoIds.push(action.payload);
      } else {
        state.favoritePhotoIds = state.favoritePhotoIds.filter(
          (id) => id !== action.payload
        );
      }

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.favoritePhotoIds)
      );
    },
  },
});

export const { toggleFavorite } = favouritesPhotoSlice.actions;
export default favouritesPhotoSlice.reducer;
