import { StyleSheet } from "react-native";
import { BotonColorOscuro, ColorFondo, ColorTexto, ColorTextoBoton, ColotTexto } from "./paletaColores.jsx";
const fondo1 = require("./fondo1.jpg");

export const styles = StyleSheet.create({
  // Main container for a scroll view, with flexible dimensions and standard background color.
  scrollContainer: {
    flex: 1,
    backgroundColor: ColorFondo,
    padding: "4%",
  },
  // General container with center alignment, useful for screens or sections.
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorFondo,
  },
  // Styling for main titles, with prominent font size and centered text.
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: "2%",
    color: ColorTexto,
    textAlign: "center",
  },
  // Standard button styling with blue background and centered text.
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    margin: 20,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  // Text inside buttons, with color contrast for readability.
  buttonText: {
    color: ColorTexto,
    marginLeft: 10,
  },
  // Input field styling, with specified border, padding, and white text color.
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    padding: 10,
    marginVertical: 10,
    color: "white",
  },
  // General text styling with white color, suitable for dark backgrounds.
  text: {
    color: "white",
  },
  // Styling for informative text, slightly larger for emphasis.
  info: {
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  // Informative text with black color for lighter backgrounds.
  infoBlack: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },

  /* Tabla */
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    // margin: "20 20",
    marginBottom: "20%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#f3f3f3",
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: "white",
  },

  /* Usado para el componente user */
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  emailText: {
    fontSize: 18,
    color: "white",
  },

  /* Por usar */
  flatListContent: {
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#ccc",
    color: ColorTexto,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  marcaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modeloText: {
    fontSize: 18,
    marginBottom: 20,
  },
  styleButton: {
    backgroundColor: BotonColorOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2,
  },
  buttonPalette: {
    backgroundColor: BotonColorOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2,
  },
  textoButton: {
    color: ColorTextoBoton,
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
