import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';

export function StepOne() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const navigation = useNavigation();

    function handleBackButton() {
        navigation.goBack();
    }

    async function handleNextButton() {

        try {
            const schema = yup.object().shape({
                driverLicense: yup.string()
                    .required('CNH é um campo obrigatório.'),
                email: yup.string()
                    .required('E-mail é um campo obrigatório.')
                    .email('Por favor, insira um e-mail válido.'),
                name: yup.string()
                    .required('Nome é um campo obrigatório.')
            })

            const user = {name, email, driverLicense};

            await schema.validate(user);
            navigation.navigate('StepTwo', {user});
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                Alert.alert('Verifique as informações abaixo:', error.message)
            }
        }
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
                            <Bullet active />
                            <Bullet />
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
                            1. Dados
                        </FormTitle>

                        <Input
                            iconName='user'
                            placeholder='Nome'
                            onChangeText={setName}
                            value={name}
                        />

                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            onChangeText={setEmail}
                            value={email}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />

                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                            keyboardType='numeric'
                        />
                    </Form>
                    <Button
                        title="Próximo"
                        onPress={handleNextButton}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}