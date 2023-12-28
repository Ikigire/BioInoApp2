import { View, Text, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 8,
      lineHeight: 24,
    },
  });


export default Terminos = () => {
    return (
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>1. Objeto del Portal</Text>
          <Text style={styles.paragraph}>
            El Portal es una herramienta del NOMBRE ORGANISMO, que forma parte de la iniciativa portal gub.u www.gub.uy/sinonimo_sitio tiene como objetivo facilitar la interacción de forma ágil, de las personas con los contenidos publicados, brindando información detallada y acceso directo a los servicios disponibles en línea.
          </Text>
    
          <Text style={styles.title}>2. Condición de usuario</Text>
          <Text style={styles.paragraph}>
            Se considera usuario a los efectos de estos Términos cualquier persona física, jurídica o entidad pública, estatal o no, que ingrese al sitio para recorrer, conocer e informarse o utilice el Portal y su contenido, directamente o a través de una aplicación informática.
          </Text>
    
          <Text style={styles.title}>3. Condiciones de acceso y utilización del sitio web</Text>
          <Text style={styles.paragraph}>
            La utilización del Portal tiene carácter gratuito para el usuario, quien se obliga a utilizarlo respetando la normativa nacional vigente, las buenas costumbres y el orden público, comprometiéndose en todos los casos a no causar daños a NOMBRE ORGANISMO, a otro usuario o a terceros. En su mérito, el usuario se abstendrá de utilizar el Portal, sus contenidos o cualquiera de sus servicios con fines o efectos ilícitos, prohibidos en estos Términos, en normas técnicas o jurídicas, lesivos de los derechos e intereses de NOMBRE ORGANISMO, de otros usuarios o de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización del Portal, sus servicios o contenidos, así como de cualquier equipo informático de NOMBRE ORGANISMO, de otros usuarios o de terceros. Salvo indicación en contrario, la información contenida en el Portal será considerada de carácter público. Cuando su uso o tratamiento estén sujetos a algún tipo de restricción deberá estarse a lo indicado expresamente en ese caso.
          </Text>
        </View>
        </ScrollView>
      );
}