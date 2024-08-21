import React, { useState, useRef } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import ScannerQR from './ScannerQR'; // Asegúrate de que la ruta sea correcta

const Conectando = ({ navigation }) => {
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [direccionMAC, setDireccionMAC] = useState('');
    const flashMessageRef = useRef(); // Referencia para FlashMessage

    // Función para manejar la recepción de la información escaneada
    const handleQRScan = (data) => {
        setDireccionMAC(data);
        setShowQRScanner(false); // Oculta el escáner después de recibir la información
    };

    return (
        <View style={styles.container}>
            {/* Botón para mostrar el módulo de ScannerQR */}
            <Pressable
                onPress={() => setShowQRScanner(true)}
                style={({ pressed }) => [
                    styles.qrButton,
                    { backgroundColor: pressed ? '#135e8f' : '#1D6FB8' }
                ]}
            >
                <Text style={styles.qrButtonText}>Escanear QR</Text>
            </Pressable>

            {/* Contenedor para el módulo ScannerQR */}
            <View style={styles.qrContainer}>
                {/* Módulo ScannerQR */}
                {showQRScanner && <ScannerQR onScan={handleQRScan} />}
            </View>

            {/* Otro contenido aquí, si es necesario */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#1D6FB8',
        marginBottom: 20
    },
    qrButtonText: {
        color: 'white',
        fontSize: 18
    },
    qrContainer: {
        alignItems: 'center' // Alinea el contenido verticalmente
    }
});

export default Conectando;
