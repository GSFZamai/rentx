import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 0 24px;
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 115}px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.secondady_500};
    font-size: ${RFValue(40)}px;
    color: ${({theme}) => theme.colors.title};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    color: ${({theme}) => theme.colors.text};
    margin-top: 16px;
`;

export const Form = styled.View`
    width: 100%;
    margin: 64px 0;
`;

export const Footer = styled.View``;