import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    containercc:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'right',
        justifyContent: 'center',
        width: '100%'
    },
    grid: (maxColumns = 4) => ({
        flex: maxColumns, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        fontSize: 20,
        paddingHorizontal: 15,
        // marginHorizontal: 30,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%'
    }),
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row'
    },
    "1col": {
        textAlign: 'center',
        justifyContent: 'center',
        marginHorizontal: 7,
        flex: 1
    },
    "2col": {
        flex: 2
    },
    "3col": {
        flex: 3
    },
    "4col": {
        flex: 4
    },
    fullContainer: {
        width: '100%',
    },
    centerContent: {
        flex: 1, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        fontSize: 20,
        paddingHorizontal: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    cardContent: {
        paddingTop: 35,
        paddingBottom: 15,
        backgroundColor: 'black',
        width: '100%',
        minHeight: '20%',
        alignContent: 'flex-end',
        alignItems: 'center'
    },
    input: {
        marginTop: 25,
        width: '100%',
        minHeight: 45,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: '#cfcfcf',
        borderRadius: 17,
        backgroundColor: '#f5f2f2',
        shadowColor: '#cfcfcf'
    },
    input2: {
        marginTop: 25,
        marginBottom:50,
        width: '100%',
        minHeight: 45,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: '#cfcfcf',
        borderRadius: 17,
        backgroundColor: '#f5f2f2',
        shadowColor: '#cfcfcf'
    },
    card: {
        width: '95%',
        marginHorizontal: 10,
        marginTop: 5,
        paddingVertical: 10,
        backgroundColor: '#1D6FB8',
        borderRadius: 20,
        borderWidth: 5,
        color: '#fff',
        borderColor: '#1D6FB8',

        alignItems: 'center'
    },
    card_title: {
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        marginVertical: 0
    },
    card_subtitle: {
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        marginVertical: 6
    },
    card_text: {
        color: '#fff',
        fontSize: 14
    },
    card_img: {
        height: '75%',
        overlayColor: '#fff',

    },
    input_error_message_container: {
        display: 'flex',
        paddingVertical: 4,
        justifyContent: 'center',
        backgroundColor: 'red',
        width: '100%',
        borderRadius: 18,
        marginTop: 6
    },
    input_error_message: {
        color: '#fff',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '75%',
        backgroundColor: '#fff',
        marginTop: 16
    },
    
    button: {

        height: 50,
        width: '100%',
        borderRadius: 15 ,
        textAlign: 'center',
        color: '1d6fb8',
        backgroundColor: '#0390fc',
        verticalAlign: 'middle',
        alignSelf: 'center'

    },
    
});