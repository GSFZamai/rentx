import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    flex-direction: row;
    justify-content: space-between;
    height: 126px;
    padding: 24px;
    margin-bottom: 16px;
`;

export const Details = styled.View`
    
    justify-content: center;
`;

export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
`;
export const Model = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
`;
export const About = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
`;

export const Rent = styled.View`
    margin-right: 25px;
`;

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
`;

export const Value = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(15)}px;
`;

export const Type = styled.View`
    color: ${({ theme }) => theme.colors.text_detail};
`;

export const CarImage = styled.Image`
    width: 180px;
    height: 92px;
`;