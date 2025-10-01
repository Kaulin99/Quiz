import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#d9534f',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600',
    },
    errorSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#6C63FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
    },
    counter: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 10,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 20,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6C63FF',
        borderRadius: 4,
    },
    questionBox: {
        padding: 25,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    questionText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        lineHeight: 24,
    },
    alternativesContainer: {
        width: '100%',
        flexGrow: 1, 
    },
    alternativeButton: {
        backgroundColor: '#6C63FF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    alternativeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    selectedAlternative: {
        backgroundColor: '#3b31b3', 
        borderWidth: 2,
        borderColor: '#fff',
    },
    confirmButton: {
        backgroundColor: '#28a745', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10, 
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default styles;