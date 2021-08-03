import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    
    margin-top: ${getStatusBarHeight() + 18}px;
    margin-left: 24px;
`;

export const CarSliderContainer = styled.View`
    margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled(ScrollView).attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center'
    },
    showsVerticalScrollBar: false
})``;

export const Description = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const Details = styled.View`
    
`;

export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
`;

export const Model = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(25)}px;
`;

export const Rent = styled.View`
`;

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
`;

export const Value = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.main};
    font-size: ${RFValue(25)}px;
`;

export const Accessories = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.background_primary};
    padding: 24px 24px ${getBottomSpace() + 24}px;
`;

export const RentDetails = styled.View`
    width: 100%;
`;

export const RentDateDetails = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.line};
    padding: 0 24px 16px 0;
`;

export const CalendarIconContainer = styled.View`
    width: 48px;
    height: 48px;
    background-color: ${({ theme }) => theme.colors.main};
    justify-content: center;
    align-items: center;
`;

export const RentDateControl = styled.View`

`;

export const RentDateText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
    margin-bottom: 8px;
`;

export const RentDate = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;   
`;

export const RentValueDetails = styled.View`
    margin-top: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const RentTax = styled.View`
    
`;

export const RentTaxTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.text_detail};
    font-size: ${RFValue(10)}px;
    margin-bottom: 8px;
`;
export const RentTaxValue = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
`;

export const RentTaxTotal = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.success};
    font-size: ${RFValue(24)}px;
    align-self: flex-end;
`;