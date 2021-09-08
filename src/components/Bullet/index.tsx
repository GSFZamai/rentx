import React from 'react';

import { 
    Container 
} from './styles';

interface isActive {
    active?: boolean;
}

export function Bullet({
    active = false
}: isActive) {
    return(
        <Container active={active} />
    )
}