import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1; 
    background-color: ${({ theme }) => theme.colors.header};
`;

export const Header = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    padding-top: 96px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`;

export const DoneContainer = styled.View`
    margin-bottom: 40px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(30)}px;
    margin-bottom: 16px;
`;

export const Message = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    text-align: center;
`;

export const Footer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`;

