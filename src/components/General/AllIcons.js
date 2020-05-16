import React from 'react';
import { IconType } from '../../utilities/constants';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

function AllIcons({iconType, name, size, color, style}) {

    switch (iconType) {
        case IconType.Ionicons:
            return <Ionicons style={style} name={name} size={size} color={color} />;
        case IconType.FontAwesome:
            return <FontAwesome style={style} name={name} size={size} color={color} />;
        case IconType.MaterialIcons:
            return <MaterialIcons style={style} name={name} size={size} color={color} />;
        case IconType.MaterialCommunityIcons:
            return <MaterialCommunityIcons style={style} name={name} size={size} color={color} />;
        case IconType.Octicons:
            return <Octicons style={style} name={name} size={size} color={color} />;
        default:
            return;
    }
};

export default AllIcons;