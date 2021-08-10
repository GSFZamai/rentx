import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
   align-items: center;
   background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;
    background-color: ${({ theme }) => theme.colors.header};
    padding: ${getStatusBarHeight() + 20}px 24px 32px;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(30)}px;
    margin: 32px 0;
`;

export const Subtitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_400};
    color: ${({ theme }) => theme.colors.background_secondary};
    font-size: ${RFValue(15)}px;
    margin: 32px 0;
`;

export const Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0px 16px;
`;

export const SchedulesContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    padding: 24px 0;
`;

export const SchedulesTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(15)}px;
`;
export const SchedulesQuantity = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
    width: 100%;
    margin-bottom: 16px;
`;

export const CarFooter = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-top: -10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
`;

export const CarFooterTitle = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(15)}px;
`;

export const CarFooterPeriod = styled.View`
    align-items: center;
    flex-direction: row;
`;

export const CarFooterDate = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
`;