import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

interface IndexProps {
    active: boolean;
}

export const Container = styled.View`
    width: 100%;
`;

export const ImageIndexesContainer = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const ImageIndex = styled.View<IndexProps>`
    height: 6px;
    width: 6px;
    background-color: ${({ theme, active }) => 
            active ? theme.colors.title : theme.colors.shape};
    margin-right: 8px;
    border-radius: 3px;
`;

export const CarImageContainer = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: 132px;
    justify-content: center;
    align-items: center;
`;

export const CarImage = styled.Image`
    width: 280px;
    height: 132px;
`;