import { Button, View, Text, Image } from 'react-native';
import styles from './Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const s = require("./Styles")

function History({ navigation }) {
    return (
        <View style={s.container}>
            <Text>{'Seleccione Un Periodo Historico'}</Text>
            <Image source={require('./assets/co2.jpeg')} style={{ width: 340, height: 400 }} />
            <Button
                title='Aceptar'
                onPress={() => navigation.navigate("Histo")}
            />
        </View>
    );
}
export default History;