import { createSlice } from "@reduxjs/toolkit";

export const infoSlice = createSlice({
  name: "infoText",
  initialState: {
    isDriverRegisterd: false,
    id: '',
    text: "",
    extractedInfo: {
      type: "",
      name: "",
      licenseNumber: "",
      dateOfBirth: "",
      bloodType: "",
      nationality: "",
      sex: "",
      address: "",
      weight: "",
      height: "",
      agency_code: "",
      dl_codes: "",
      expirationDate: "",
      conditions: "",
      restrictions: "",
    },
    finalDriver: {
      license_number: '',
      first_name: '',
      middle_initial: '',
      last_name: '',
      address: '',
      birthdate: '',
      nationality: '',
      gender: '',
      weight: '',
      height: '',
      expiration_date: '',
      blood_type: '',
      agency_code: "",
      dl_codes: "",
      condition: "",
      classification: '',
    }
  },
  reducers: {
    setRecognizedText: (state, action) => {
      state.extractedInfo = action.payload;
      const recogText = state.extractedInfo;

      console.log(recogText);
    },
    setFinalDriver: (state) => {
      state.finalDriver.license_number = state.extractedInfo.licenseNumber
      
      const fullname = state.extractedInfo.name

      // Split the fullname into parts
      const nameParts = fullname.split(", ");

      // Extract the first, middle, and last names
      if (nameParts.length === 1) {
        state.finalDriver.last_name = nameParts[0];
      } else if (nameParts.length === 2) {
        state.finalDriver.last_name = nameParts[0];
        const firstAndMiddle = nameParts[1].split(" ");
        state.finalDriver.first_name = firstAndMiddle[0];
        state.finalDriver.middle_initial = firstAndMiddle.length > 1 ? firstAndMiddle[1].charAt(0) : '';
      }

      state.finalDriver.address = state.extractedInfo.address
      state.finalDriver.birthdate = state.extractedInfo.dateOfBirth
      state.finalDriver.nationality = state.extractedInfo.nationality
      state.finalDriver.gender = state.extractedInfo.sex
      state.finalDriver.weight = state.extractedInfo.weight
      state.finalDriver.height = state.extractedInfo.height
      state.finalDriver.expiration_date = state.extractedInfo.expirationDate
      state.finalDriver.blood_type = state.extractedInfo.bloodType
      state.finalDriver.agency_code = state.extractedInfo.agency_code
      state.finalDriver.dl_codes = state.extractedInfo.dl_codes

      // if condition is empty
      const condition = state.extractedInfo.conditions
      if (condition != ''){
        state.finalDriver.condition = state.extractedInfo.conditions
      }else {
        state.finalDriver.condition = state.extractedInfo.restrictions
      }

      state.finalDriver.classification = state.extractedInfo.classification

    },
    setEmptyRecognizedText: (state) => {
      state.extractedInfo = {
        type: "",
        name: "",
        licenseNumber: "",
        dateOfBirth: "",
        bloodType: "",
        nationality: "",
        sex: "",
        address: "",
        weight: "",
        height: "",
        agency_code: "",
        dl_codes: "",
        expirationDate: "",
        conditions: "",
        restrictions: "",
      };
    },
    setEmptyFinalDriver: (state) => {
      state.finalDriver = {
        license_number: '',
        first_name: '',
        middle_initial: '',
        last_name: '',
        address: '',
        birthdate: '',
        nationality: '',
        gender: '',
        weight: '',
        height: '',
        expiration_date: '',
        blood_type: '',
        agency_code: "",
        dl_codes: "",
        condition: "",
        classification: null,
      }
    },
    setDriverRegisterd: (state) => {
      state.isDriverRegisterd = true
    },
    setDriverID: (state, action) => {
      state.id = action.payload
    },
    // SET MANUALLY INFO
    setDriverClassification: (state, action) => {
      state.finalDriver.classification = action.payload
    },
    setLicenseNumber: (state, action) => {
      state.finalDriver.license_number = action.payload
    },
    setFirstName: (state, action) => {
      state.finalDriver.first_name = action.payload
    },
    setMiddleInitial: (state, action) => {
      state.finalDriver.middle_initial = action.payload
    },
    setLastName: (state, action) => {
      state.finalDriver.last_name = action.payload
    },
    setAddress: (state, action) => {
      state.finalDriver.address = action.payload
    },
    setBirthDate: (state, action) => {
      state.finalDriver.birthdate = action.payload
    },
    setNationality: (state, action) => {
      state.finalDriver.nationality = action.payload
    },
    setGender: (state, action) => {
      state.finalDriver.gender = action.payload
    },
    setWeight: (state, action) => {
      state.finalDriver.weight = action.payload
    },
    setHeight: (state, action) => {
      state.finalDriver.height = action.payload
    },
    setExpirationDate: (state, action) => {
      state.finalDriver.expiration_date = action.payload
    },
    setBloodTypes: (state, action) => {
      state.finalDriver.blood_type = action.payload
    },
    setAgencyCodes: (state, action) => {
      state.finalDriver.agency_code = action.payload
    },
    setDLCodes: (state, action) => {
      state.finalDriver.dl_codes = action.payload
    },
    setCondition: (state, action) => {
      state.finalDriver.condition = action.payload
    },
    setGetFinalDriver: (state, action) => {
      state.finalDriver = action.payload
    }
  },
});

export const { 
  setRecognizedText, 
  setFinalDriver, 
  setEmptyRecognizedText, 
  setEmptyFinalDriver, 
  setDriverRegisterd, 
  setDriverID,
  setDriverClassification,
  setLicenseNumber,
  setFirstName,
  setMiddleInitial,
  setLastName,
  setAddress,
  setBirthDate,
  setNationality,
  setGender,
  setWeight,
  setHeight,
  setExpirationDate,
  setBloodTypes,
  setAgencyCodes,
  setDLCodes,
  setCondition,
  setGetFinalDriver
} = infoSlice.actions;

export default infoSlice.reducer;
