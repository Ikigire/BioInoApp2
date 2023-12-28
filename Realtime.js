import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';

const s = require("./Styles")
let json;

// async function getData() {
//     let resp = await fetch("http://localhost:4000/mqtt");
//     await resp.json().then((valor) => {
//         json = valor;
//     })
// }


const Device = ({
    ubicacion,
    nombre,
    modelo,
    mac, 
    img = "./assets/iot_512.png", 
    navigation 
}) => {
    return (
        <Pressable onPress={() => navigation.navigate("Mqtt", { mac: mac })} key={nombre} style={s.card}>
            
            <Text style={s.card_title}> {nombre} </Text>
            <Text>
                <Image source={require('./assets/iot_512.png')} style={{ width: 125, height: 120, resizeMode: 'contain', backgroundColor: '#fff' }} />
                <View>
                    <Text style={s.card_text}> Ubicación: {ubicacion} </Text>
                    <Text style={s.card_text}> Modelo: {modelo} </Text>
                    <Text style={s.card_text}>  {mac} </Text>
                </View>
            </Text>
        </Pressable>
        // <Pressable>
        //      <MaterialCommunityIcons name={icon} size={icon_size} />{'\n' + text}
        //     <View style={s.container}>
        //         <Image source={require('./assets/Propuesta.jpg')} style={{ width: 125, height: 120 }} />
        //         {/* <Image source={require(asset)} style={{ width: 125, height: 120 }} /> */}
        //         <Text>{name}</Text>
        //     </View>
        // </Pressable>
    );
};


function Realtime({ navigation }) {
    // getData();

    return (
        // <View style={s.container}>
        //     <Image source={require('./assets/Real.jpg')} style={{ width: 330, height: 350 }} />
        //     <Text>{json.h}</Text>
        // </View>
        <ScrollView>

            <View style={s.container}>

                <Device
                    navigation={navigation}
                    ubicacion={'Oficina'}
                    nombre={'Oficina - device'}
                    modelo={'123plasd'}
                    mac={"142800F7C630"}
                    />
                <Device
                    navigation={navigation}
                    ubicacion={'Habitación'}
                    nombre={'El Dormilón'}
                    modelo={'Imac74'}
                    mac={"78C8BF519140"}
                    />
                <Device
                    navigation={navigation}
                    ubicacion={'Sala'}
                    nombre={'El Relajado'}
                    modelo={'abcdaedasd'}
                    mac={"201804F7C630"}
                    />

            </View>

        </ScrollView>
    );
}

export default Realtime;