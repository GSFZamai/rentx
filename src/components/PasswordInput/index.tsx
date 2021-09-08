import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    IconContainer,
    StyledInput
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: InputProps) {
    const [isDirty, setIsDirty] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const theme = useTheme();

    function handlePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handleOnFocus() {
        setIsActive(true);
    };

    function handleOnBlur() {
        setIsActive(false);
        setIsDirty(!!value)
    };

    return (
        <Container >
            <IconContainer isActive={isActive}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isActive || isDirty) ? theme.colors.main : theme.colors.text}
                />
            </IconContainer>

            <StyledInput
                {...rest}
                secureTextEntry={!isPasswordVisible}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                isActive={isActive}
            />

            <BorderlessButton onPress={handlePasswordVisibility}>
                <IconContainer isActive={isActive}>
                    <Feather
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color={theme.colors.text}
                    />
                </IconContainer>
            </BorderlessButton>

        </Container>
    )
}
