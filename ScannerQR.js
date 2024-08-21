import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function ScannerQR({onScan = null}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    // alert(`Se detecto la clave: ${data} del dispositivo`);
    onScan({data})
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          // onBarcodeScanned={scanned ? undefined : typeof onScan === 'function'? onScan : handleBarCodeScanned}
          onBarcodeScanned={ scanned ? undefined : handleBarCodeScanned}
          
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: 300, // Ancho del contenedor de la cámara
    height: 300, // Alto del contenedor de la cámara
    borderRadius: 15, // Bordes redondeados
    overflow: "hidden", // Para recortar el contenido que se desborda
    marginBottom: 20, // Espacio entre la cámara y el botón
  },
  camera: {
    flex: 1, // Para que la cámara ocupe todo el espacio del contenedor
  },
});
