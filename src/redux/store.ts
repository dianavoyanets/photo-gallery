import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import favouritesPhotoReducer from "./features/favouritesPhotoSlice";
import { photoGalleryApi } from "./services/photoGalleryApi";

export const store = configureStore({
  reducer: {
    favouritesPhoto: favouritesPhotoReducer,
    [photoGalleryApi.reducerPath]: photoGalleryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photoGalleryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
