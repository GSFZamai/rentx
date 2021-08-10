import React, { useState } from 'react';
import { useRef } from 'react';
import { ViewToken } from 'react-native';
import { FlatList } from 'react-native';

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

interface onChangedProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function CarSlider({ imagesUrl }: CarSliderProps) {
    const [itemOnView, setItemOnView] = useState(0);

    const itemChange = useRef((info: onChangedProps) => {
        const index = info.viewableItems[0].index;
        console.log(index);
        setItemOnView(index)
    });

    return (
        <Container>

            <ImageIndexesContainer>
                {
                    imagesUrl.map((_, index) => (
                        <ImageIndex
                            key={index}
                            active={index === itemOnView}
                        />
                    ))
                }
            </ImageIndexesContainer>

            <FlatList
                data={imagesUrl}
                keyExtractor={key => key}
                renderItem={({item, separators}) => {
                    return(
                    <CarImageContainer>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode='contain'
                        />
                    </CarImageContainer>)
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={itemChange.current}
            />




        </Container>
    )
}