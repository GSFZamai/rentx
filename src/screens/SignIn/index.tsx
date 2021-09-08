import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import * as yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const theme = useTheme();

    async function handleSubmit() {
        try {
            const schema = yup.object().shape({
                password: yup
                    .string()
                    .required('A senha é obrigatória'),
                email: yup
                    .string()
                    .required('Email obrigatório')
                    .email('Digite um e-mail válido')
            });

            await schema.validate({ password, email });
            signIn({email, password});
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro ao validar, verifique suar credenciais');
            }
        }
    }

    function handleCreateAccount() {
        navigation.navigate('StepOne');
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Title>
                            Estamos{'\n'}
                            quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={setPassword}
                            value={password}
                        />

                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            enabled={true}
                            onPress={handleSubmit}
                        />
                        <Button
                            title='Criar conta gratuita'
                            onPress={handleCreateAccount}
                            light
                            color={theme.colors.background_secondary}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}