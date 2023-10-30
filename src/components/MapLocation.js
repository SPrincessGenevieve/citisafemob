import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import ConstButton from "./ConstButton";
import ConstButtonShort from "./ConstButtonShort";

export default function MapLocation({
  location,
  selectedPin,
  currentAddress,
  handleMapPress,
  getLocation,
  showMap,
  setShowMap,
  form,
  setForm,
}) {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location ? location.latitude : 8.2727,
          longitude: location ? location.longitude : 124.8483,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedPin && (
          <Marker
            coordinate={selectedPin.coordinate}
            title={selectedPin.address}
          />
        )}
      </MapView>

      <View
        style={{
          padding: 16,
          width: "100%",
          alignItems: "center",
          height: 90,
        }}
      >
        {selectedPin ? (
          <>
            <ConstButtonShort
              name={"antdesign"}
              onPress={getLocation}
              height={50}
              backgroundColor={"green"}
              title={"Get Location"}
            />
          </>
        ) : (
          <>
            <ConstButtonShort
              name={"antdesign"}
              title={"Get Location"}
              onPress={getLocation}
              height={50}
              backgroundColor={"green"}
            />
          </>
        )}
      </View>
    </View>
  );
}
