import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favouritePhotoIds";

interface FavouritesPhotoState {
  favouritePhotoIds: string[];
}

const initialState: FavouritesPhotoState = {
  favouritePhotoIds: JSON.parse(
    window.localStorage.getItem(STORAGE_KEY) || "[]"
  ),
};

export const favouritesPhotoSlice = createSlice({
  name: "favouritesPhoto",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      if (!state.favouritePhotoIds.includes(action.payload)) {
        state.favouritePhotoIds.push(action.payload);
      } else {
        state.favouritePhotoIds = state.favouritePhotoIds.filter(
          (id) => id !== action.payload
        );
      }

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.favouritePhotoIds)
      );
    },
  },
});

export const { toggleFavourite } = favouritesPhotoSlice.actions;
export default favouritesPhotoSlice.reducer;
