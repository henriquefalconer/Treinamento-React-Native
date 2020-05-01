import React from "react";
import { View, Text } from "react-native";
import AllIcons from "../../General/AllIcons";

function PiuAction({ iconType, icon, actionCount, size }) {
    return (
      <View style={{margin: 5, flexDirection: 'row', alignItems: 'center' }}>
        <AllIcons 
            iconType={iconType} 
            name={icon} 
            size={size} 
            color="#C6C5C5" />
        {actionCount != undefined && (
            <Text style={{marginLeft: 5, color: '#C6C5C5', fontSize: 15, fontWeight: 'bold' }}>
              {actionCount}
            </Text>
        )}
      </View>
    );
}

export default PiuAction;