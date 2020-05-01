import React from "react";
import { View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconWithBadge({ iconType, name, badgeCount, color, size }) {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 7.5,
              paddingHorizontal: 5,
              height: 17,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
}

export default IconWithBadge;