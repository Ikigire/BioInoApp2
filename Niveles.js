import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
// import { SelectList } from 'react-native-dropdown-select-list'

const s = require("./Styles")

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

function Niveles({ navigation }) {
    const [inferior, setInferior] = React.useState("");
    const [superior, setSuperior] = React.useState("");
    const [isFocus1, setIsFocus1] = React.useState(false);
    const [isFocus2, setIsFocus2] = React.useState(false);

    const data = [
        { label: '10%', value: '10%' },
        { label: '20%', value: '20%' },
        { label: '30%', value: '30%' },
        { label: '40%', value: '40%' },
        { label: '50%', value: '50%' },
        { label: '60%', value: '60%' },
        { label: '70%', value: '70%' },
        { label: '80%', value: '80%' },
        { label: '90%', value: '90%' },
        { label: '100%', value: '100%' },
    ]

    return (
        <View style={{ fontSize: 20, flex: 2, textAlign: 'center', justifyContent: 'center', alignItems: "center", width: '100%' }}>
            <Text>Niveles de Riesgo</Text>
            <Text>Estufa</Text>
            <Text>Ubicación: Cocina</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Text>Limite Inferior:</Text>
                <Dropdown
                    mode="modal"
                    style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }, { minWidth: '50%' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data}

                    maxHeight={'95%'}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus1 ? 'Limite Inferior' : '...'}
                    searchPlaceholder="Search..."
                    value={inferior}
                    onFocus={() => setIsFocus1(true)}
                    onBlur={() => setIsFocus1(false)}
                    onChange={item => {
                        setInferior(item.value);
                        setIsFocus1(false);
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                <Text>Limite Superior:</Text>
                <Dropdown
                    mode="modal"
                    style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }, { minWidth: '50%' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}

                    maxHeight={'95%'}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus2 ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={superior}
                    onFocus={() => setIsFocus2(true)}
                    onBlur={() => setIsFocus2(false)}
                    onChange={item => {
                        setSuperior(item.value);
                        setIsFocus2(false);
                    }}
                />
            </View>
            {/* <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', width: '100%'}}>
                <Text>Limite Inferior:</Text>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    search={false}
                    defaultOption={{ key: '4', value: '40%' }}
                    boxStyles={{width: '65%'}}
                    dropdownStyles={{width: '65%'}}
                />
            </View>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', width: '100%'}}>
                <Text>Limite Superior:</Text>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    search={false}
                    defaultOption={{ key: '4', value: '40%' }}
                />
            </View> */}
            <Button
                
                title='Aceptar'
                onPress={() => navigation.navigate("Ubica")}
            />
        </View>
    );
}

export default Niveles;