# Treinamento-React-Native

Autores: Henrique e Constanza

## Detalhes sobre o projeto:

- [Link do Figma](https://www.figma.com/file/bjJ5eXFW8OqacPFAeOvIMz/PiuPiuwer-RN?node-id=0%3A1)
- [Link do curso](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)
- [Link de react-navigation](https://reactnavigation.org/docs/hello-react-navigation)
- [Link de SplashScreen e Logo](https://www.youtube.com/watch?v=3Gf9yb53bJM)

## Como adicionar uma nova tela:

1. Adicionar **[Nova tela].js** em **src/screens**
2. Inserir o seguinte código em **[Nova tela].js**:

    ```
    import React from "react";
    import { SafeAreaView, StyleSheet } from "react-native";

    function [Nova tela]() {
        return (
            <SafeAreaView style={styles.background}></SafeAreaView>
        );
    };

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
    });

    export default [Nova tela];
    ```
3. Adicionar `import [Nova tela] from "./src/screens/[Nova tela]";` em **App.js**
4. Ainda em **App.js**, adicionar, dentro de **Stack.Navigator**:

    ```
    <Stack.Screen name="[Nova tela]" component={[Nova tela]} />
    ```