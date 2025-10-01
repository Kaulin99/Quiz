import { StyleSheet } from "react-native";

<<<<<<< HEAD
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
        marginTop: 12, 
    },

    viewQuestionsText: { 
        color: '#28a745',    
        marginRight: 16, 
        fontWeight: '600' 
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
=======
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  temaItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  temaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  temaSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  viewQuestionsButton: {
    marginTop: 10,
    backgroundColor: "#3f51b5",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  viewQuestionsText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#FFC107",
    padding: 8,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 6,
  },
  edit: {
    color: "#fff",
    fontWeight: "bold",
  },
  delete: {
    color: "#fff",
    fontWeight: "bold",
  },
});
>>>>>>> d3c00e08fd1cb7462ce0314a1aa30d4da9437a2c
