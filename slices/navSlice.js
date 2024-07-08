import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  polyLineCoordinate:[],
  rideStatus:false
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
          },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setPolyLine:(state,action)=>{
      state.polyLineCoordinate = action.payload;
    },
    setRideStatus:(state,action)=>{
      state.rideStatus = action.payload;
    },
    setResetState:(state)=>{
      state.origin = null;
      state.destination= null,
      state.travelTimeInformation= null,
      state.polyLineCoordinate=[],
      state.rideStatus=false
    }
  },
});

export const {setOrigin, setDestination, setTravelTimeInformation,setPolyLine,setRideStatus,setResetState}= navSlice.actions;


export const selectOrigin = (state) =>state.nav.origin

export const selectDestination = (state) =>state.nav.destination

export const selectTravelTimeInformation = (state) =>state.nav.travelTimeInformation

export const selectPolylineCoordinates = (state) =>state.nav.polyLineCoordinate

export const selectRideStatus = (state) =>state.nav.rideStatus

export default navSlice.reducer