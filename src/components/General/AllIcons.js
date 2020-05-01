import React from 'react';
import IconType from '../../utilities/constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AllIcons({iconType, name, size, color}) {
    switch (iconType) {
        case IconType.Ionicons:
            return <Ionicons name={name} size={size} color={color} />;
        case IconType.FontAwesome:
            return <FontAwesome name={name} size={size} color={color} />;
        case IconType.MaterialIcons:
            return <MaterialIcons name={name} size={size} color={color} />;
        case IconType.MaterialCommunityIcons:
            return <MaterialCommunityIcons name={name} size={size} color={color} />;
    }
};

export default AllIcons;