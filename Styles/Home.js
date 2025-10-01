import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center', // Centraliza o conteúdo na tela
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        flexDirection: 'row',       // Alinha ícone e texto na horizontal
        alignItems: 'center',       // Centraliza verticalmente
        justifyContent: 'center',   // Centraliza horizontalmente
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
        // Sombra para dar profundidade
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonIcon: {
        marginRight: 10, // Espaço entre o ícone e o texto
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;