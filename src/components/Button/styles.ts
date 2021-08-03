import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps extends RectButtonProps {
    color?: string;
}

export const Container = styled(RectButton)<ContainerProps>`
    background-color: ${({color, theme}) => color? color : theme.colors.main};
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_500};
    color: ${({theme}) => theme.colors.background_secondary};
    font-size: ${RFValue(15)}px;
`;