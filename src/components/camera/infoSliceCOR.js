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
      name: '',
      address: '',
      contact_number: '',
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

      state.finalVehicle.name = state.extractedInfo.complete_owners_name
      state.finalVehicle.address = state.extractedInfo.complete_address
      state.finalVehicle.contact_number = state.extractedInfo.telephone_no_contact_details
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
    },
    // set manually
    setOwnerName: (state, action) => {
      state.finalVehicle.name = action.payload
    },
    setOwnerAddress: (state, action) => {
      state.finalVehicle.address = action.payload
    },
    setOwnerContactNumber: (state, action) => {
      state.finalVehicle.contact_number = action.payload
    },
    setPlateNumber: (state, action) => {
      state.finalVehicle.plate_number = action.payload
    },
    setMake: (state, action) => {
      state.finalVehicle.make = action.payload
    },
    setColor: (state, action) => {
      state.finalVehicle.color = action.payload
    },
    setVehicleClass: (state, action) => {
      state.finalVehicle.vehicle_class = action.payload
    },
    setBodyMarkings: (state, action) => {
      state.finalVehicle.body_markings = action.payload
    },
    setVehicleModel: (state, action) => {
      state.finalVehicle.vehicle_model = action.payload
    },
    setManualDriverID: (state, action) => {
      state.finalVehicle.driverID = action.payload
    },
    setGetFinalVehicle: (state, action) => {
      state.finalVehicle = action.payload

      console.log(state.finalVehicle)
    },
    setEmptyextractedInfo: (state) => {
      state.extractedInfo = {
        plate_no: "",
        make: "",
        date: "",
        series: "",
        body_markings: "",
        complete_owners_name: "",
        complete_address: "",
        telephone_no_contact_details: "",
        class: ''
      }
    },
    setEmptyFinalVehicle: (state) => {
      state.finalVehicle = {
        name: '',
        address: '',
        contact_number: '',
        plate_number: '',
        make: '',
        color: '',
        vehicle_class: '',
        body_markings: '',
        vehicle_model: '',
        driverID: '',
      }
      state.extractedInfo = {
        plate_no: "",
        make: "",
        date: "",
        series: "",
        body_markings: "",
        complete_owners_name: "",
        complete_address: "",
        telephone_no_contact_details: "",
        class: ''
      }
      state.id = ''
      state.isCarRegistered = false
      state.driverids = ''
      state.text = ''
      
    }


  },
});

export const { 
  setRecognizedText, 
  setVehicleID, 
  setIsCarRegistered, 
  setFinalVehicle, 
  setdriverID,
  setOwnerName,
  setOwnerContactNumber,
  setOwnerAddress,
  setPlateNumber,
  setMake,
  setColor,
  setVehicleClass,
  setBodyMarkings,
  setVehicleModel,
  setGetFinalVehicle,
  setManualDriverID,
  setEmptyFinalVehicle,
  setEmptyextractedInfo,
} = infoSliceCOR.actions;

export default infoSliceCOR.reducer;
