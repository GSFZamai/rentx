import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Car as CarModel } from '../../database/model/Car';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.header};
    width: 100%;

    height: 113px;
    justify-content: flex-end;
`;

export const HeaderContent = styled.View`
   flex-direction: row;
   justify-content: space-between;
   padding: 32px 24px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
`;

export const CarList = styled(FlatList as new () => FlatList<CarModel>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
})``;

export const ActivityIndicatorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;