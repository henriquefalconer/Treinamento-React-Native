import React from "react";
import { View, Text } from "react-native";
import AllIcons from "../../General/AllIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

function PiuAction({ iconType, icon, actionCount, size, active, onPress, verticalIconDisplacement }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{margin: 5, flexDirection: 'row', alignItems: 'center', width: 40 }}>
          <View style={{top: verticalIconDisplacement}}>
            <AllIcons 
                iconType={iconType} 
                name={icon} 
                size={size} 
                color={active ? "#f21d1d" : "#aaa"} 
              />
          </View>
          {actionCount != undefined && (
              <Text style={{marginLeft: 5,
                  color: active ? "#f21d1d" : "#aaa",
                  fontSize: 14,
                  fontWeight: active ? "bold" : "normal",
              }}>
                {actionCount}
              </Text>
          )}
        </View>
      </TouchableOpacity>
    );
}

export default PiuAction;