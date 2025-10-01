import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
        color: '#666',
    },
    // Estilo do Card
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    playButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    // Estilos da Modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
    },
    startButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    startButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;