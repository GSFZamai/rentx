import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo'

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated'

import { CarDTO } from '../../dtos/CarDTO';
import { Car as CarModel } from '../../database/model/Car';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { CarSlider } from '../../components/CarSlider';
import { Button } from '../../components/Button';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

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
    Footer,
    OfflineInfo
} from './styles'
import { StatusBar } from 'expo-status-bar';

interface CarParams {
    car: CarModel
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as CarParams;
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

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar
                style='dark'
                backgroundColor={'white'}
                translucent
            />


            <Animated.View style={[headerAnimation, styles.header, { backgroundColor: theme.colors.background_secondary }]}>
                <Header>
                    <BackButton
                        onPress={handleBackButtonClick}
                    />
                </Header>




                <Animated.View style={carSliderAnimation}>
                    <CarSliderContainer>
                        <CarSlider
                            imagesUrl={
                                !!carUpdated.photos ?
                                    carUpdated.photos :
                                    [{ id: car.thumbnail, photo: car.thumbnail }]
                            }
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
                        <Period>{car.period}</Period>
                        <Value>R$ {
                            netInfo.isConnected === true ? carUpdated.price : '...'
                        }</Value>
                    </Rent>

                </Description>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {carUpdated.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))}
                    </Accessories>
                }
                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher período do aluguel'
                    onPress={handleButtonClick}
                    enabled={netInfo.isConnected === true}
                />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se para ver mais detalhes e realizar seu agedamento.
                    </OfflineInfo>
                }
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