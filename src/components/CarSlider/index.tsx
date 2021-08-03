import React from 'react';

import {
    Container,
    ImageIndexesContainer,
    ImageIndex,
    CarImageContainer,
    CarImage,
} from './styles';

interface CarSliderProps {
    imagesUrl: string[];
}

export function CarSlider({ imagesUrl }: CarSliderProps) {
    return (
        <Container>

            <ImageIndexesContainer>
                <ImageIndex active={true} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
                <ImageIndex active={false} />
            </ImageIndexesContainer>


            <CarImageContainer>
                <CarImage
                    source={{ uri: imagesUrl[0] }}
                    resizeMode='contain'
                />
            </CarImageContainer>

        </Container>
    )
}