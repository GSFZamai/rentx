import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    IconContainer,
    StyledInput
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value: string;
}

export function Input({
    iconName,
    value,
    ...rest
}: InputProps) {
    const [isDirty, setIsDirty] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const theme = useTheme();

    function handleOnFocus() {
        setIsActive(true);
    };

    function handleOnBlur() {
        setIsActive(false);
        setIsDirty(!!value)
    };

    return (
        <Container isActive={isActive}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isActive || isDirty) ? theme.colors.main : theme.colors.text}
                />
            </IconContainer>

            <StyledInput

                {...rest}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />

        </Container>
    )
}
