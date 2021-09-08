import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';
import { Alert } from 'react-native';
import { api } from '../../../services/api';

interface UserProps {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function StepTwo() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const route = useRoute();
    const {user} = route.params as UserProps;
    const navigation = useNavigation();
    const theme = useTheme();


    function handleBackButton() {
        navigation.goBack();
    }

    async function handleConfirmation() {
        if(!password || !confirmPassword) {
            return Alert.alert('Campo vazio!','Favor conferir se ambos os campos estão preenchidos.');
        }

        if(password !== confirmPassword) {
            return Alert.alert('Campos divergentes', 'Verifique se a senha e confirmação de senha são iguais.');
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        }).then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: `Pronto!\nagora é só logar e\naproveitar.`,
                returnTo: 'SignIn'
            })
        }).catch((error) => {
            console.log(error);
            Alert.alert('Opa', 'Não foi possível realizar o cadastro, tente novamente.')
        })

    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        backgroundColor='transparent'
                        style='dark'
                        translucent
                        hidden={false}
                    />
                    <Header>
                        <BackButton
                            onPress={handleBackButton}
                        />
                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>
                    </Header>
                    <Title>
                        Crie sua{'\n'}
                        conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil.
                    </SubTitle>
                    <Form>
                        <FormTitle>
                            2. Senha
                        </FormTitle>

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Repetir senha'
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />

        
                    </Form>
                    <Button 
                        title="Cadastrar"
                        color={theme.colors.success}
                        onPress={handleConfirmation}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}