import { createSlice } from "@reduxjs/toolkit";

export const infoSliceCOR = createSlice({
  name: "infoTextOCR",
  initialState: {
    id: '',
    isCarRegistered: false,
    driverids: '',
    text: "",
    extractedInfo: {
      plate_no: "",
      make: "",
      date: "",
      series: "",
      body_markings: "",
      complete_owners_name: "",
      complete_address: "",
      telephone_no_contact_details: "",
      class: ''
    },
    finalVehicle: {
      owner_ID: {
        name: '',
        address: '',
        contact_number: '',
      },
      plate_number: '',
      make: '',
      color: '',
      vehicle_class: '',
      body_markings: '',
      vehicle_model: '',
      driverID: '',
    }
  },
  reducers: {
    setRecognizedText: (state, action) => {
      state.extractedInfo = action.payload;
      const recogText = state.extractedInfo;

      console.log(recogText);
    },
    setVehicleID: (state, action) => {
      state.id = action.payload
    },
    setIsCarRegistered: (state) => {
      state.isCarRegistered = true
    },
    setFinalVehicle: (state) => {

      state.finalVehicle.owner_ID.name = state.extractedInfo.complete_owners_name
      state.finalVehicle.owner_ID.address = state.extractedInfo.complete_address
      state.finalVehicle.owner_ID.contact_number = state.extractedInfo.telephone_no_contact_details
      state.finalVehicle.plate_number = state.extractedInfo.plate_no
      state.finalVehicle.make = state.extractedInfo.make
      state.finalVehicle.color = state.extractedInfo.color
      state.finalVehicle.vehicle_class = state.extractedInfo.class
      state.finalVehicle.body_markings = state.extractedInfo.body_markings
      state.finalVehicle.vehicle_model = state.extractedInfo.series
      state.finalVehicle.driverID = state.driverids
    },
    setdriverID: (state, action) => {
      state.driverids = action.payload
    }
  },
});

export const { setRecognizedText, setVehicleID, setIsCarRegistered, setFinalVehicle, setdriverID } = infoSliceCOR.actions;

export default infoSliceCOR.reducer;
