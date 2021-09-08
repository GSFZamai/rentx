import styled, {css} from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputActive {
    isActive: boolean;
}

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    margin-bottom: 8px;
`;

export const IconContainer = styled.View<InputActive>`
    width: 55px;
    height: 55px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${({theme}) => theme.colors.background_secondary};
    ${({theme, isActive})=> isActive && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`;

export const StyledInput = styled(TextInput)<InputActive>`
    flex: 1;
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    background-color: ${({theme}) => theme.colors.background_secondary};
    padding: 0 23px;

    ${({theme, isActive})=> isActive && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`;