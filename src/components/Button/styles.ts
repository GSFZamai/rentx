import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
    color?: string;
}

interface ButtonTextProps {
    light: boolean;
}

export const Container = styled(RectButton) <ContainerProps>`
    background-color: ${({ color, theme }) => color ? color : theme.colors.main};
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 19px;
    margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme, light }) =>
        light
            ?
            theme.colors.title
            :
            theme.colors.background_secondary
    };
    font-size: ${RFValue(15)}px;
`;