import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 0 24px;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${getStatusBarHeight() + 30}px;
`;

export const Steps = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    margin: 50px 0 16px;
    font-family: ${({theme}) => theme.fonts.secondady_500};
    color: ${({theme}) => theme.colors.title};
    font-size: ${RFValue(40)}px;    
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_400};
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(15)}px;    
    line-height: ${RFValue(25)}px;    
`;

export const Form = styled.View`
    width: 100%;
    margin-top: 64px;
    margin-bottom: 24px;
`;

export const FormTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.secondady_600};
    color: ${({theme}) => theme.colors.title};
    font-size: ${RFValue(20)}px;
    margin-bottom: 24px;
`;
