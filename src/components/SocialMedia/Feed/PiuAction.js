import React from "react";
import { View, Text } from "react-native";
import AllIcons from "../../General/AllIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

function PiuAction({ iconType, icon, actionCount, size, active, onPress, verticalIconDisplacement, horizontalIconDisplacement, noMargin=false, activeColor="#f21d1d" }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{margin: noMargin ? 0 : 5, marginRight: noMargin ? 5 : 0, flexDirection: 'row', alignItems: 'center', width: (noMargin ? 20 : 40)}}>
          <View style={{top: verticalIconDisplacement, left: horizontalIconDisplacement}}>
            <AllIcons 
                iconType={iconType} 
                name={icon} 
                size={size} 
                color={active ? activeColor : "#aaa"} 
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