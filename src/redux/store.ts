import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./features/photoSlice";
import photosReducer from "./features/photosSlice";
import favouritesPhotoReducer from "./features/favouritesPhotoSlice";

export const store = configureStore({
  reducer: {
    photo: photoReducer,
    photos: photosReducer,
    favouritesPhoto: favouritesPhotoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
