export const settingsReducer = (state, action) => {
    switch (action.type) {
        case "SET_ID":
            return { ...state, id: action.payload };
        case "SET_LOOP":
            return { ...state, loop: action.payload };
        case "SET_PLAYBACK_RATE":
            return { ...state, playback_rate: action.payload };
        default:
            return state;
    }
};

export const initialSettingsState = {
    id: null,
    loop: false,
    playback_rate: 1

};

