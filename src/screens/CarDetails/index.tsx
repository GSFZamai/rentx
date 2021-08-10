import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated'

import { CarDTO } from '../../dtos/CarDTO';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { CarSlider } from '../../components/CarSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { NavigationProps } from '../../dtos/navigation';

import {
    Container,
    Header,
    CarSliderContainer,
    Description,
    Details,
    Brand,
    Model,
    Rent,
    Period,
    Value,
    Accessories,
    About,
    Footer
} from './styles'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface CarProps {
    car: CarDTO
}



export function CarDetails() {
    const navigation = useNavigation<NavigationProps>();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as CarProps;
    const animationValue = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        animationValue.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
    })

    const headerAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(animationValue.value, [0, 200], [200, 80], Extrapolate.CLAMP)
        }
    });

    const carSliderAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animationValue.value, [0, 150], [1, 0], Extrapolate.CLAMP)
        }
    })

    function handleButtonClick() {
        navigation.navigate('Scheduling', { car })
    }

    function handleBackButtonClick() {
        navigation.goBack();
    }

    return (
        <Container>
            <Animated.View style={[headerAnimation, styles.header, {backgroundColor: theme.colors.background_secondary}]}>
                <Header>
                    <BackButton
                        onPress={handleBackButtonClick}
                    />
                </Header>

                <Animated.View style={carSliderAnimation}>
                    <CarSliderContainer>
                        <CarSlider
                            imagesUrl={car.photos}
                        />
                    </CarSliderContainer>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                style={
                    {
                        paddingHorizontal: 24,
                        paddingTop: getStatusBarHeight() + 160,
                    }
                }
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Description>
                    <Details>
                        <Brand>{car.brand}</Brand>
                        <Model>{car.name}</Model>
                    </Details>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Value>R$ {car.rent.price}</Value>
                    </Rent>

                </Description>
                <Accessories>
                    {car.accessories.map(accessory => (
                        <Accessory
                            key={accessory.type}
                            name={accessory.name}
                            icon={getAccessoryIcon(accessory.type)}
                        />
                    ))}
                </Accessories>

                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher período do aluguel'
                    onPress={handleButtonClick}
                />
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    }
})