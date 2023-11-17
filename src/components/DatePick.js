import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Octicons";

function DatePick({ onDateChange, value, style }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Icon size={25} name="calendar"></Icon>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

export default DatePick;
