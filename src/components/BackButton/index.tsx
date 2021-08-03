import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Container,
} from './styles';


interface IconProps extends BorderlessButtonProps {
    color?: string;
}

export function BackButton({color, ...rest}: IconProps) {
    const theme = useTheme(); 

    return (
        <Container 
            {...rest}
        >
            <MaterialIcons 
                name="chevron-left"
                size={24}
                color={color ? color : theme.colors.text_detail}
            />
        </Container>
    )
}