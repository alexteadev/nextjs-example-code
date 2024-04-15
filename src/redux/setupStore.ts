import { authAPI } from "@/services/api/AuthServices";
import { userAPI } from "@/services/api/UserServices";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import actorsFilterSlice from "./slices/actorsFilterSlice";
import directorsFilterSlice from "./slices/directorsFilterSlice";
import filmSortActorSlice from "./slices/filmSortActorSlice";
import filmSortDirectorSlice from "./slices/filmSortDirectorSlice";
import filmSortMyListSlice from "./slices/filmSortMyListSlice";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    filter: filterSlice,
    actorsFilter: actorsFilterSlice,
    directorsFilter: directorsFilterSlice,
    filmActorSort: filmSortActorSlice,
    filmDirectorSort: filmSortDirectorSlice,
    filmSortMyList: filmSortMyListSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            userAPI.middleware,
            authAPI.middleware,
        )
    });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];