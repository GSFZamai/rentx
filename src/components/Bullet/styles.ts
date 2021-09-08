import styled from 'styled-components/native';

interface isActive {
    active: boolean;
}

export const Container = styled.View<isActive>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({theme, active}) => active ? theme.colors.title : theme.colors.text_detail};
`;