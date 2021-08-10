import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../assets/logo.svg';
import Brand from '../../assets/brand.svg';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    runOnJS
} from 'react-native-reanimated';

import {
    Container,
} from './styles';
import { useNavigation } from '@react-navigation/native';

interface NavigationProps {
    navigate: (screen: string) => void;
}

export function SplashScreen() {
    const navigation = useNavigation<NavigationProps>();
    const animationValue = useSharedValue(0);

    function startApp() {
        navigation.navigate('SignIn')
    }

    const logoAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animationValue.value, [0, 50], [0, 1]),
            transform: [
                {
                    translateX: interpolate(animationValue.value, [0, 50], [-50, 0])
                }
            ]
        }
    })

    const brandAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animationValue.value, [0, 50], [1, 0]),
            transform: [
                {
                    translateX: interpolate(animationValue.value, [0, 50], [0, -50])
                }
            ]
        }
    })

    useEffect(() => {
        animationValue.value = withTiming(50, {
            duration: 2000
        },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        )
    }, []);


    return (
        <Container>
            <StatusBar 
                hidden
            />
            <Animated.View style={[brandAnimation, { position: 'absolute' }]}>
                <Brand width={80} />
            </Animated.View>

            <Animated.View style={[logoAnimation, { position: 'absolute' }]}>
                <Logo width={180} height={80} />
            </Animated.View>
        </Container>
    )
}
