import { TouchableOpacity } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ActiveProp {
    active: boolean;
}

export const Container = styled.View`
    
`;

export const Header = styled.View`
    padding: 0 24px;
    width: 100%;
    height: 227px;
    background-color: ${({ theme }) => theme.colors.header};
    align-items: center;
`;

export const HeaderTop = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_600};
    font-size: ${RFValue(25)}px;
    color: ${({ theme }) => theme.colors.background_secondary};
`;



export const LogoutButtonContainer = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    background-color: ${({ theme }) => theme.colors.shape};
    margin-top: 47px;
`;

export const Photo = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    overflow: hidden;
`;

export const ChangePhotoButtonContainer = styled(RectButton)`
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.main};
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: -0px;
`;

export const Content = styled.View`
    width: 100%;
    margin-top: 122px;
    padding: 0 24px;
    align-items: center;
`;

export const Options = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-around;    
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Option = styled(TouchableOpacity) <ActiveProp>`
    padding-bottom: 14px;
    ${({ active, theme }) => active && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`;

export const OptionTitle = styled.Text<ActiveProp>`
    font-family: ${({ theme, active }) => (
        active ? theme.fonts.secondady_600 : theme.fonts.secondady_400
    )};
    font-size: ${RFValue(20)}px;
    color: ${({ theme, active }) => (
        active ? theme.colors.title : theme.colors.text_detail
    )};
`;

export const Form = styled.View`
    margin-top: 24px;
`;