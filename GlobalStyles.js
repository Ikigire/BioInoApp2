import { StyleSheet } from "react-native";


export const gStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
        borderRadius: 8,
        backgroundColor: '#f5f2f2',
        shadowColor: '#cfcfcf'
    },
    card: {
        width: '95%',
        marginHorizontal: 10,
        marginTop: 5,
        paddingVertical: 10,
        backgroundColor: '#1D6FB8',
        borderRadius: 25,
        borderWidth: 3,
        color: '#fff',
        borderColor: '#1D6FB8',

        alignItems: 'center'
    },
    card_title: {
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 26,
        marginVertical: 6
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
        fontSize:14
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
        borderRadius: 15,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#1d6fb8',
        verticalAlign: 'middle',
        alignSelf: 'center'

    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1D6FB8'
    },
    link: {
        fontSize: 12,
        fontWeight: '800',
        color: '#0000EE'
    }
})