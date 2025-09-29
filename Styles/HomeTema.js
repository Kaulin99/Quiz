import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#f9f9f9' 
    },
    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        marginBottom: 16, 
        textAlign: 'center', 
        color: '#333' 
    },
    temaItem: { 
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    temaTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#222', 
        marginBottom: 4 
    },
    temaSubText: { 
        fontSize: 14, 
        color: '#555', 
        marginBottom: 2 
    },
    actions: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 8 
    },
    edit: { 
        color: '#007bff', 
        marginRight: 16, 
        fontWeight: '600' 
    },
    delete: { 
        color: '#d9534f', 
        fontWeight: '600' 
    },
});

export default styles;