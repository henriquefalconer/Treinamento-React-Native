import React from "react";
import { View, Text } from "react-native";
import AllIcons from "../../General/AllIcons";

function PiuAction({ iconType, icon, actionCount, size, active }) {
    return (
      <View style={{margin: 5, flexDirection: 'row', alignItems: 'center', width: 40 }}>
        <AllIcons 
            iconType={iconType} 
            name={icon} 
            size={size} 
            color={active ? "#f21d1d" : "#aaa"} />
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
    );
}

export default PiuAction;