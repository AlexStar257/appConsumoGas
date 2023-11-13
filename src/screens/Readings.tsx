import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal, StatusBar, ScrollView, Alert
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { LogBox } from 'react-native';
import { ViewProps } from 'react-native';
import { Button, Image } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import NetInfo from '@react-native-community/netinfo';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './LoginScreen';

const Readings = () => {
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs(['ViewPropTypes']);
    const Tab = createBottomTabNavigator();

    StatusBar.setBackgroundColor('#1464f6')
    const [selected, setSelected] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [isInsertCodeModalVisible, setIsInsertCodeModalVisible] = useState(false);
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isModalAdverVisible, setIsModalAdverVisible] = useState(false);
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
    const [numberClient, setNumberClient] = useState('');
    const [lastCapture, setLastCapture] = useState('');
    const [newCapture, setNewCapture] = useState('');
    const [difference, setDifference] = useState('');
    const [liters, setLiters] = useState('');
    const [address, setAddress] = useState('');
    const [complex, setComplex] = useState('');
    const [interior, setInterior] = useState('');
    const [debt, setDebt] = useState('');
    const [lectura, setLectura] = useState('lectura');
    const [isSelectedChecBox, setSelectionCheckBox] = useState(false);
    const cameraRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImageURI, setCapturedImageURI] = useState<string | null>(null);

    {/*CheckBox Capturados*/ }

    const initialState = {
        capturados: false
    }
    const [state, setState] = useState(initialState);




    const data = [
        { key: '1', value: 'CONDOMINIO AZTECAS' },
        { key: '2', value: 'CONDOMINIO LA CANTERA TORRE C' },
        { key: '3', value: 'CONDOMINIO LA CANTERA TORRE A' },
        { key: '4', value: 'CONDOMINIO LA CANTERA TORRE B' },
        { key: '5', value: 'PUNTO CENTRAL TORRE 1' },
    ];

    const headers = ['Dirección', 'Lectura', 'Interior', 'No. Cliente'];
    const rows = [
        ['CONDOMINIO AZTECA TORRE A 01', ' ', '01', '424'],
        ['CONDOMINIO AZTECA TORRE A 02', ' ', '02', '425'],
        ['CONDOMINIO AZTECA TORRE A 03', ' ', '03', '426'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '05', '427'],

    ];




    const onFilterChange = (text: React.SetStateAction<string>) => {
        setFilterText(text);
    };

    const filteredRows = rows.filter(
        (row) =>
            row[2].includes(filterText) || row[3].includes(filterText)
    );

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showInsertCodeModal = () => {
        setIsInsertCodeModalVisible(true);
    };
    const showErrorModal = () => {
        setIsModalErrorVisible(true);
    };
    const hideErrorModal = () => {
        setIsModalErrorVisible(false);
    }
    const hideInsertCodeModal = () => {
        setIsInsertCodeModalVisible(false);
    };
    const showModalSave = () => {
        setIsModalSaveVisible(true);
    }
    const hideModalSave = () => {
        setIsModalSaveVisible(false);
    }
    const showModalAdver = () => {
        setIsModalAdverVisible(true);
    }
    const hideModalAdver = () => {
        setIsModalAdverVisible(false);
    }
    const showQRModal = () => {
        setIsQRModalVisible(true);
    }
    const hideQRModal = () => {
        setIsQRModalVisible(false);
    }
    const openCamera = () => {
        setIsCameraOpen(true);
    };
    const cancelOnlineMode = () => {
        setIsEnabled(false)
        hideModalAdver()
    }

    function scanNumberClient(numberClient: any) {
        setNumberClient(numberClient)
        setIsInsertCodeModalVisible(true)
        setIsQRModalVisible(false)

    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await (cameraRef.current as RNCamera).takePictureAsync();
                setIsCameraOpen(false);

                // Abre la pantalla de recorte de imagen
                ImagePicker.openCropper({
                    path: uri,
                    width: 300,
                    height: 400,
                    mediaType: 'photo',
                    cropping: true,
                    cropperCircleOverlay: false,
                    cropperToolbarTitle: 'Recortar imagen',
                    freeStyleCropEnabled: true,
                    includeBase64: true,
                }).then((croppedImage) => {
                    if (croppedImage) {
                        setCapturedImageURI(croppedImage.path);

                        // Obtén y establece el texto reconocido en "New Capture"
                        ObtenerTexto(croppedImage.path);
                    }
                });
            } catch (error) {
                console.error('Error al tomar la foto:', error);
            }
        }
    };

    const ObtenerTexto = async (imageUri: string) => {
        try {
            const result = await TextRecognition.recognize(imageUri);
            console.log('Texto reconocido:', result.text);
            const onlyNumbers = result.text.replace(/\D/g, '');

            setNewCapture(onlyNumbers);
        } catch (error) {
            console.error('Error al obtener el texto:', error);
        }
    };

    return (
        <View style={styles.container}>

            {/* 
            <View style={styles.pendingsContainer}>
                <TouchableOpacity style={styles.buttonPendings}>
                    <Text style={styles.buttonTextCapture}>Pendientes</Text>
                </TouchableOpacity>
            </View>*/}


            <View style={styles.switchContainer}>
                <CheckBox
                    disabled={false}
                    value={state.capturados}

                    tintColors={{ true: 'black', false: 'black' }}

                    style={{ borderColor: 'black', borderRadius: 5, borderWidth: 1, width: 40, height: 40 }}

                    onValueChange={(value) => setState({ ...state, capturados: value })}
                />
                <Text style={styles.switchText}>Capturados</Text>
                <Switch
                    value={isEnabled}
                    onValueChange={setIsEnabled}
                    trackColor={{ false: 'red', true: 'green' }}

                    onChange={showModalAdver}
                />
                <Text style={styles.switchText}>Offline</Text>
                {/* <TouchableOpacity style={styles.buttonCapture} onPress={showModal}>
                    <Text style={styles.buttonTextCapture}>Capturar</Text>
                </TouchableOpacity>*/}

            </View>

            <View style={styles.selectSwitchContainer}>
                <SelectList
                    setSelected={setSelected}
                    data={data}
                    save="value"
                    dropdownStyles={{
                        backgroundColor: 'white',
                        width: "100%",
                        position: 'absolute',
                        top: 50,
                        zIndex: 1,
                    }}
                    dropdownTextStyles={{
                        color: 'black',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 5,
                        width: "100%",
                        textAlign: 'center',
                    }}
                    boxStyles={{
                        backgroundColor: 'white',
                        marginTop: 10,
                        width: '100%',
                        height: 55,
                    }}
                    inputStyles={{ color: 'black', textAlign: 'center', fontFamily: 'Asap', textAlignVertical: 'auto', fontSize: 15 }}
                    placeholder="Seleccione una Subred"
                />
            </View>

            <View style={styles.filterContainer}>
                <TextInput
                    style={styles.filterInput}
                    placeholder="Filtrar"
                    placeholderTextColor={'black'}
                    value={filterText}
                    onChangeText={onFilterChange}
                />
            </View>



            <Table borderStyle={{ borderWidth: 1, borderColor: "#cccccc", marginTop: 20 }}>
                <Row
                    data={headers}
                    style={{
                        backgroundColor: '#c0c0c0',
                    }}
                    height={40}
                    flexArr={[1, 1, 1, 1, 1]}
                    textStyle={{ textAlign: 'center', color: 'black', fontWeight: "bold" }}
                />

            </Table>
            <ScrollView >

                <Table style={{ marginBottom: 40 }} borderStyle={{ borderWidth: 1, borderColor: "#cccccc" }}>
                    <TableWrapper>
                        <Rows
                            data={filteredRows}

                            textStyle={{ color: 'black', textAlign: 'center', fontSize: 11 }}
                        />
                    </TableWrapper>
                </Table>
            </ScrollView>

            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Captura de Lectura</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={showQRModal}>
                            <Text style={styles.modalButtonText}>Escanear QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={showInsertCodeModal}>
                            <Text style={styles.modalButtonText}>Insertar Codigo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/*Modal de captura de lectura */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isInsertCodeModalVisible}
                onRequestClose={hideInsertCodeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>


                        <ScrollView>
                            <Text style={styles.modalTitle}>Captura de Lectura</Text>
                            <Text style={styles.subText}>Insertar Codigo</Text>



                            <View style={{ flexDirection: "row" }}>

                                <TextInput
                                    style={styles.modalInputB}
                                    placeholderTextColor={"#ccccc"}
                                    placeholder="Codigo del cliente"
                                    value={numberClient}
                                    onChangeText={text => setNumberClient(text)}
                                />

                                <TouchableOpacity style={styles.modalButtonB}>
                                    <Image
                                        source={require('../../img/search.png')}
                                        style={{ marginStart: 5, width: 50, height: 50, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.subText}>Ultima Captura</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={lastCapture}
                                editable={false}
                                onChangeText={(text) => setLastCapture(text)}
                            />

                            <Text style={styles.subText}>Nueva Captura</Text>
                            <View style={{ flexDirection: "row" }}>

                                <TextInput
                                    style={styles.modalInputB}
                                    placeholder="Nueva captura"
                                    placeholderTextColor={"#cccccc"}
                                    value={newCapture}
                                    onChangeText={text => setNewCapture(text)}
                                />
                                <TouchableOpacity style={styles.modalButtonB} onPress={openCamera}>
                                <Image
                                    source={require('../../img/camera.png')}
                                    style={{ marginStart: 9, width: 50, height: 50, alignSelf: 'center' }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            </View>

                            <Text style={styles.subText}>Diferencia</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={difference}
                                editable={false}

                                onChangeText={(text) => setDifference(text)}
                            />

                            <Text style={styles.subText}>Litros</Text>
                            <TextInput
                                style={styles.modalInput}
                                editable={false}

                                value={liters}
                                onChangeText={(text) => setLiters(text)}
                            />

                            <Text style={styles.subText}>Dirección</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={address}
                                editable={false}

                                onChangeText={(text) => setAddress(text)}
                            />

                            <Text style={styles.subText}>Complejo</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={complex}
                                editable={false}

                                onChangeText={(text) => setComplex(text)}
                            />

                            <Text style={styles.subText}>Interior</Text>
                            <TextInput
                                style={styles.modalInput}
                                editable={false}

                                value={interior}
                                onChangeText={(text) => setInterior(text)}
                            />

                            <Text style={styles.subText}>Deuda</Text>
                            <TextInput
                                style={styles.modalInput}
                                value={debt}
                                editable={false}

                                onChangeText={(text) => setDebt(text)}
                            />

                            <TouchableOpacity style={styles.modalButton} onPress={showModalSave}>
                                <Text style={styles.modalButtonText}>Guardar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={hideInsertCodeModal}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>

            </Modal>

            <Modal
                transparent={true}
                animationType='slide'
                visible={isCameraOpen}
                onRequestClose={() => setIsCameraOpen(false)}
            >
                <View style={{ flex: 1 }}>
                    <RNCamera
                        ref={cameraRef}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.back}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={takePicture} style={styles.cameraButton}>
                                <Text style={styles.cameraButtonText}>Tomar Foto</Text>
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
            </Modal>

            {/*Modal de guardado con éxito */}
            <Modal transparent={true} animationType='slide' visible={isModalSaveVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <Text style={styles.modalTitle}>Captura de Lectura</Text>

                        <View style={styles.ImageContent}>
                            <Image resizeMode='contain' style={styles.ModalImage} source={require('../../img/checkGreen.png')} />

                        </View>


                        <Text style={styles.modalTitle}>Guardado con éxito</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideModalSave}>
                            <Text style={styles.modalButtonText}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/*Modal de Error */}
            <Modal transparent={true} animationType='slide' visible={isModalErrorVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>ERROR</Text>

                        <View style={styles.ImageContent}>
                            <Image style={styles.ModalImage} source={require('../../img/error.png')} />
                        </View>
                        <Text style={styles.subTextB}>No tienes conexión a internet</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideErrorModal}>
                            <Text style={styles.modalButtonText}>Entendido</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            {/*Modal de advertencia*/}
            <Modal transparent={true} animationType='slide' visible={isModalAdverVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Advertencia</Text>
                        <View style={styles.ImageContent}>
                            <Image resizeMode='contain' style={styles.ModalImage} source={require('../../img/advertencia.png')} />

                        </View>
                        <Text style={styles.modalTitle}>¿Estas seguro?</Text>

                        <Text style={styles.subTextB}>Todas las capturas realizadas en modo offline seran enviadas</Text>

                        <View style={styles.ButtonContentModal}>
                            <TouchableOpacity style={styles.modalButtonC} onPress={showErrorModal}>
                                <Text style={styles.modalButtonText} >Si</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonC} onPress={cancelOnlineMode} >
                                <Text style={styles.modalButtonText} >Cancelar</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>


            {/*Modal de la lectura de QR */}
            <Modal
                transparent={true}
                animationType='slide'
                visible={isQRModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Leer Codigo QR</Text>

                        <QRCodeScanner containerStyle={styles.QrModalContent} cameraStyle={styles.QrModalImage} markerStyle={styles.QrModalImage} onRead={({ data }) => scanNumberClient(data)} />

                        <TouchableOpacity style={styles.modalButton} onPress={hideQRModal}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomNav}>
                <Tab.Navigator>
                    <Tab.Screen
                        name='Captura'

                        listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); showModal(); } })}
                        component={LoginScreen}
                        options={{
                            tabBarActiveTintColor: "#133E85",
                            tabBarInactiveTintColor: "#133E85",
                            tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    source={require('../../img/capture.png')}
                                    style={{ tintColor: color, width: size, height: size }}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name='Guardar Pendientes'
                        component={LoginScreen}
                        listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); showModalAdver(); } })}
                        options={{
                            tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
                            tabBarInactiveTintColor: "#133E85",

                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    source={require('../../img/save.png')}
                                    style={{ tintColor: color, width: size, height: size }}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "white",
    },
    bottomNav: {
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    Title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
    },
    buttonPendings: {
        backgroundColor: "#606060",
        marginTop: 15,
        borderRadius: 5,
        paddingVertical: 9,
        marginLeft: 15,
        width: 100,
        height: 55,
    },
    selectSwitchContainer: {

        width: "100%"
    },
    switchContainer: {

        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
    },
    pendingsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",

    },
    switchText: {
        color: "black",
        fontSize: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
    },
    switch: {
        marginLeft: 10,
    },
    buttonTextCapture: {
        fontSize: 17,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        alignContent: "center",
        marginTop: 9,
    },
    buttonCapture: {
        marginTop: 10,
        borderRadius: 5,
        paddingVertical: 9,
        marginLeft: 30,
        width: 100,
        height: 55,
        backgroundColor: "#DF2828",
    },
    filterInput: {
        fontSize: 15,
        width: "100%",
        height: 55,
        color: "black",
        marginTop: 6,
        borderRadius: 5,
        borderColor: "#232323",
        borderWidth: 1,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 55,
        marginBottom: 20,
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalButton: {
        marginVertical: 10,
        borderRadius: 5,
        paddingVertical: 9,
        backgroundColor: '#005aab',
        alignItems: 'center',
    },
    modalButtonC: {
        marginVertical: 10,
        borderRadius: 5,
        paddingVertical: 9,
        backgroundColor: '#005aab',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    modalTitle: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
    },
    modalInput: {
        width: 250,
        color: "black",
        marginTop: 10,
        borderColor: "#232323",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    modalInputB: {
        width: 170,
        color: "black",
        marginTop: 10,
        borderColor: "#232323",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
    modalButtonB: {
        borderRadius: 5,
        marginLeft: 15,
        marginTop: 12,
        width: 70,
        height: 50,
        borderColor: "black",
        borderWidth: 1,

        backgroundColor: "#ebebeb",
    },
    modalButtonTextB: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",

    },
    subText: {
        color: "black",
        fontSize: 17,

    },
    subTextB: {
        color: "black",
        fontSize: 17,
        textAlign: "center"
    },
    cameraButton: {
        padding: 15,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    cameraButtonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    ModalImage: {
        width: 100,
        height: 100,
    },
    ImageContent: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: "center",
    },
    QrModalImage: {
        width: 150,
        height: 150,
    },
    QrModalContent: {
        marginTop: 30,
        marginBottom: 200,
        alignItems: "center",

    },
    ButtonContentModal: {
        width: "100%",
        alignContent: "center",
    },
});

export default Readings;
