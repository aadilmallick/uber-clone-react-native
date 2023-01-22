import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    /**
     *
     * @param {*} state
     * @param {{payload: {location: {lat: number, lng: number}, description: string}}} action the payload you pass in must be an object with a location property, like {location:
     * {lat: string, lng: string}
     * }
     */
    setOrigin: (state, action) => {
      let {
        location: { lat, lng },
        description,
      } = action.payload;
      state.origin = { lat, lng, description };
    },
    /**
     *
     * @param {*} state
     * @param {{payload: {location: {lat: number, lng: number}, description: string}}} action
     */
    setDestination: (state, action) => {
      if (!action.payload) {
        state.destination = null;
      } else {
        let {
          location: { lat, lng },
          description,
        } = action.payload;
        state.destination = { lat, lng, description };
      }
    },
    /**
     *
     * @param {any} state The store state of the slice
     * @param {object} action The dispatched action, with the payload living in action.payload
     */
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

export default navSlice.reducer;

/**
 *
 * @param {*} state
 * @returns {{lat: number, lng: number, description: string}} the information and location about the
 * origin from where you're starting.
 */
export const selectOrigin = (state) => state.nav.origin;

export const selectDestination = (state) => state.nav.destination;

export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

// rxslice: redux slice shortcut
