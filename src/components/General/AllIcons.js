import React from 'react';
import IconType from '../../utilities/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AllIcons({iconType, name, size, color}) {
    let IconTypes = {};

    IconTypes[IconType.Ionicons] =
        <Ionicons name={name} size={size} color={color} />;
    IconTypes[IconType.FontAwesome] =
        <FontAwesome name={name} size={size} color={color} />;
    IconTypes[IconType.MaterialIcons] =
        <MaterialIcons name={name} size={size} color={color} />;
    IconTypes[IconType.MaterialCommunityIcons] =
        <MaterialCommunityIcons name={name} size={size} color={color} />;
    IconTypes[undefined] =
        <Ionicons name={name} size={size} color={color} />;

    return IconTypes[iconType];
};

export default AllIcons;