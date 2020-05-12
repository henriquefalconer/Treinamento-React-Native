import React, { useState } from 'react';
import { TextInput } from 'react-native';

function ExpandingTextInput(props) {
    let [height, changeHeight] = useState(0);
    
    return (
        <TextInput 
            {...props}
            multiline={true}
            onContentSizeChange={
                (event) => {
                    if (event && event.nativeEvent && event.nativeEvent.contentSize) {
                      changeHeight(event.nativeEvent.contentSize.height);
                    }
                    props.onContentSizeChange && props.onContentSizeChange(event)
                }
            }
            style={{
                ...props.style,
                height: height > props.minHeight ? height : props.minHeight,
            }}
            autoFocus
        />
    );
}

export default ExpandingTextInput;