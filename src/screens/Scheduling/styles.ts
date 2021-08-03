import { ScrollView } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


interface DateSelectInputProps {
    selected: boolean
}

export const Container = styled.View`
   flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 325px;
    background-color: ${({ theme }) => theme.colors.header};
    padding: ${getStatusBarHeight() + 20}px 24px 32px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_500};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    margin: 32px 0;
`;

export const DateSelectContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const DateSelectController = styled.View`
    width: 30%;
`;

export const DateSelectText = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondady_400};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFValue(10)}px;
`;

export const DateSelectInput = styled.Text<DateSelectInputProps>`
    
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.shape};
    ${({ selected, theme }) => !selected && css`
            border-bottom-width: 1px;
            border-bottom-color: ${theme.colors.text};
            padding-bottom: 5px;
        `
    }    
`;

export const Content = styled(ScrollView).attrs({
    contentContainerStyle: {
        paddingBottom: 24
    },
    showsVerticalScrollIndicator: false
})``;

export const Footer = styled.View`
    padding: 24px 24px ${getBottomSpace() + 24}px;
`;