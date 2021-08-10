import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

import {
    Container,
    Title
} from './styles';
import theme from '../../styles/theme';

interface ButtonProps extends RectButtonProps {
    title: string;
    color?: string;
    onPress: () => void;
    enabled?: boolean;
    loading?: boolean;
    light?: boolean;
}

export function Button({
    onPress,
    title,
    color,
    enabled = true,
    light = false,
    loading = false,
    ...rest
}: ButtonProps) {
    return (
        <Container
            enabled={enabled}
            onPress={onPress}
            color={color}
            {...rest}
            style={
                { opacity: (enabled && !loading) ? 1 : 0.5 }
            }>

            {
                loading ?

                    <ActivityIndicator
                        color={theme.colors.shape}
                    />

                    :

                    <Title light={light}> {title} </Title>
            }
        </Container>
    )
}