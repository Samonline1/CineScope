import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: localStorage.getItem("notes")
        ? JSON.parse(localStorage.getItem("notes"))
        : [],
    favorites: localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [],
    users: localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : [],
    currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null,
};

export const featureSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        createNote: (state, action) => {
            const note = action.payload;
            state.notes.push(note);
            -localStorage.setItem("notes", JSON.stringify(state.notes));
        },
        // addFav: (state, action) => {
        // const favorite = action.payload;
        // state.favorites.push(favorite);
        // localStorage.setItem("favorites", JSON.stringify(state.favorites));
        // console.log("hogya add")

        addFav: (state, action) => {
            const { username, favorite } = action.payload;

            // Find that user in the users array 
            const user = state.users.find((u) => u.username === username);

            if (user) {
                // Create favorites array if not present
                if (!user.favorites) user.favorites = [];

                // Add new favorite
                user.favorites.push(favorite);

                // Update localStorage for users (not favorites)
                localStorage.setItem("users", JSON.stringify(state.users));

                console.log(`Added favorite to ${username}`);
            } else {
                console.log("User not found!");
            }
        },
        deleteFav: (state, action) => {
            const { username, favId } = action.payload;

            const user = state.users.find((u) => u.username === username);

            // const findFav = state.favorites.findIndex((f)=> f.id === id);

            if (user && user.favorites) {
                // const name = user.favorites.find((f) => f.id === favId);
                user.favorites = user.favorites.filter((f) => f.id !== favId);
                localStorage.setItem("users", JSON.stringify(state.users));
                // console.log(`Deleted favorite ${name.name} for user ${username}`);
            }
        },

        registerUser: (state, action) => {
            const user = action.payload;
            state.users.push(user);
            state.currentUser = user;
            localStorage.setItem("users", JSON.stringify(state.users));
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
            console.log("resister hogya");
        },
        loginUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        },
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        },
        updateNote: (state, action) => {
            const note = action.payload;
            const index = state.notes.findIndex((i) => i._id === note._id);

            if (index > 0) {
                state.notes[index] = note;
                localStorage.setItem("notes", JSON.stringify(state.notes));
            }
        },

        removeAllnotes: (state) => {
            state.notes = [];
            localStorage.removeItem("notes");
        },

        deleteNote: (state, action) => {
            const id = action.payload; // here note gets only note?._id via pasteId
            const index = state.notes.findIndex((i) => i._id === id); // dont extract its no an object its and id only put direct

            if (index >= 0) {
                state.notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(state.notes));
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    createNote,
    updateNote,
    deleteNote,
    removeAllnotes,
    addFav,
    deleteFav,
    registerUser,
    loginUser,
    logoutUser,
} = featureSlice.actions;

export default featureSlice.reducer;
