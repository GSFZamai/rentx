import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, RectButton } from 'react-native-gesture-handler';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';


import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';
import { CarDTO } from '../../dtos/CarDTO';
import { NavigationProps } from '../../dtos/navigation';

import {
    Container,
    Header,
    HeaderContent,
    Title,
    CarList,
    ActivityIndicatorContainer,
} from './styles';
import { BackHandler } from 'react-native';
import { LoadingAnimation } from '../../components/LoadingAnimation';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);


export function Home() {
    const [carList, setCarList] = useState<CarDTO[]>([]);
    const [loadingCars, setLoadingCars] = useState(true);
    const theme = useTheme();
    const navigation = useNavigation<NavigationProps>();
    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const handleDrag = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() { }
    })






    function handleCardClick(car: CarDTO) {
        navigation.navigate('CarDetails', { car: car })
    }

    function handleMyCarsButton() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await api.get('/cars');
                setCarList(data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingCars(false);
            }
        }

        getData();
    }, [])

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }, [])

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
                hidden={false}
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        heigth={RFValue(12)}
                    />
                    {
                        !loadingCars &&
                        <Title>Total de {carList.length} carros</Title>

                    }
                </HeaderContent>
            </Header>

            {
                loadingCars ?
                    <ActivityIndicatorContainer>
                        <LoadingAnimation animation='loadingCar' />
                    </ActivityIndicatorContainer>

                    :
                    <>
                        <CarList
                            data={carList}
                            keyExtractor={(item: CarDTO) => item.id}
                            renderItem={({ item }) =>
                                <CarCard carDetails={item} onPress={() => handleCardClick(item)} />
                            }

                        />
                        <PanGestureHandler onGestureEvent={handleDrag}>
                            <Animated.View style={
                                [
                                    myCarButtonAnimation,
                                    styled.view,

                                ]
                            }
                            >
                                <AnimatedButton
                                    onPress={handleMyCarsButton}
                                    style={
                                        [
                                            styled.button,
                                            { backgroundColor: theme.colors.main }
                                        ]
                                    }
                                >
                                    <Ionicons
                                        name="ios-car-sport"
                                        size={32}
                                        color={theme.colors.background_secondary}
                                    />
                                </AnimatedButton>
                            </Animated.View>

                        </PanGestureHandler>
                    </>
            }
        </Container>
    )
}

const styled = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        position: 'absolute',
        right: 22,
        bottom: 13,
    }
})