import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    summaryContainer: {
        backgroundColor: '#6C63FF',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#e0e0e0',
        marginBottom: 20,
    },
    percentageText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#fff',
    },
    scoreText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    resultItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderLeftWidth: 5,
        position: 'relative',
    },
    correctAnswer: {
        borderColor: '#28a745', // Verde
    },
    incorrectAnswer: {
        borderColor: '#d9534f', // Vermelho
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    answerText: {
        fontSize: 14,
        color: '#555',
    },
    correctAnswerText: {
        fontSize: 14,
        color: '#28a745',
        fontWeight: 'bold',
        marginTop: 4,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    footerButtons: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    homeButton: {
        backgroundColor: '#5bc0de',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default styles;