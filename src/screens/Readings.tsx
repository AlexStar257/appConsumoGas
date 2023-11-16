import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Modal, StatusBar, ScrollView, Alert, TouchableWithoutFeedback
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component';
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
    const [switchMode, setSwitchMode] = useState('Offline');
    const [selected, setSelected] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [isInsertCodeModalVisible, setIsInsertCodeModalVisible] = useState(false);
    const [isQRModalVisible, setIsQRModalVisible] = useState(false);
    const [isModalAdverVisible, setIsModalAdverVisible] = useState(false);
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
    const [isModalErrorValiVisible, setIsModalErrorValiVisibe] = useState(false);
    const [isModalConnectionVisible, setIsModalConnectionVisible] = useState(false);
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
    const [isfacturasVencidasVisible, setIsfacturasVencidasVisible] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImageURI, setCapturedImageURI] = useState<string | null>(null);

    {/*CheckBox Capturados*/ }

    const initialState = {
        capturados: false
    }
    const [state, setState] = useState(initialState);

    const headersWidth = [
        { name: 'Columna 1', width: 120 },
        { name: 'Columna 2', width: 75 },
        { name: 'Columna 3', width: 60 },
        { name: 'Columna 4', width: 60 }
    ];



    const data = [
        { key: '1', value: 'CONDOMINIO AZTECAS' },
        { key: '2', value: 'CONDOMINIO LA CANTERA TORRE C' },
        { key: '3', value: 'CONDOMINIO LA CANTERA TORRE A' },
        { key: '4', value: 'CONDOMINIO LA CANTERA TORRE B' },
        { key: '5', value: 'PUNTO CENTRAL TORRE 1' },
    ];
    const debtHeaders = ['Factura', 'Monto'];
    const debData = [['SARED1234', "124.4"], ['SARED4321', '435.40']];

    const headers = ['Dirección', 'Lectura', 'Interior', 'No. Cliente'];
    const rows = [
        ['CONDOMINIO AZTECA TORRE A 01', '125.25 ', '01', '424'],
        ['CONDOMINIO AZTECA TORRE A 02', ' 42.26', '02', '425'],
        ['CONDOMINIO AZTECA TORRE A 03', ' 46.74', '03', '426'],
        ['CONDOMINIO AZTECA TORRE A 04', ' ', '04', '427'],
        ['CONDOMINIO AZTECA TORRE A 05', ' ', '05', '428'],
        ['CONDOMINIO AZTECA TORRE A 06', ' ', '06', '429'],
        ['CONDOMINIO AZTECA TORRE A 07', ' ', '07', '430'],
        ['CONDOMINIO AZTECA TORRE A 08', ' ', '08', '431'],
        ['CONDOMINIO AZTECA TORRE A 09', ' ', '09', '432'],
        ['CONDOMINIO AZTECA TORRE A 10', ' ', '10', '433'],
        ['CONDOMINIO AZTECA TORRE A 11', ' ', '11', '434'],
        ['CONDOMINIO AZTECA TORRE A 12', ' ', '12', '435'],
        ['CONDOMINIO AZTECA TORRE A 13', ' ', '13', '436'],

    ];




    const onFilterChange = (text: React.SetStateAction<string>) => {
        setFilterText(text);
    };

    const filteredRows = rows.filter(
        (row) =>
            row[2].includes(filterText) || row[3].includes(filterText)
    );

    const showModalErrorValid = () => {
        setIsModalErrorValiVisibe(true);
    }

    const hideModalErrorValid = () => {
        setIsModalErrorValiVisibe(false);
    }

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
    const showModalConnectionVisible = () => {
        setIsModalConnectionVisible(true);

    }
    const hideModalConnectionVisible = () => {
        setIsModalConnectionVisible(false);
    }
    const openCamera = () => {
        setIsCameraOpen(true);
    };


    function openInsertCodeModalWithData(data: string[]) {
        // Verifica si rowData tiene cuatro elementos antes de desestructurarlo
        if (data.length === 4) {
            const [Direccion, lectura, interior, noCliente] = data;
            setAddress(Direccion);
            setNewCapture(lectura);
            setInterior(interior);
            setNumberClient(noCliente);
            setComplex(Direccion);
            setIsInsertCodeModalVisible(true);
        }
    }



    const checkInternetConnection = () => {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                // Si hay conexión a Internet, mostrar la alerta de éxito
                Alert.alert("Éxito", "Conexión a Internet disponible");
            } else {
                // Si no hay conexión a Internet, mostrar el modal de error
                showErrorModal();
            }
        });
    };



    const cancelOnlineMode = () => {
        setIsEnabled(false)
    }


    const checkconnectionSave = () => {
        //Comprobamos si tiene habilitado el modo online
        if (isEnabled === true) {
            //Si esta activado el modo online comprueba la conexión cada vez que se guarde
            NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                    //Si detecta que hay conexión mandara los datos al servidor
                    //Y se mostrara el mensaje de éxito
                    showModalSave()
                } else {
                    // Si no hay conexión a Internet, mostrar el modal de error
                    //A demás de desactivar el modo online
                    //Se podría agregar una advertencia que se desactivo el modo online

                    showErrorModal();
                    setSwitchMode("Offline");
                    cancelOnlineMode();
                }
            });
        }
        else {
            //En dado caso se encuentre en el modo offline se añadira la logica de guardar en 
            //SQlite

            showModalSave()
        }

    }
    const checkconnectionSwitch = () => {

        if (isEnabled === true) {
            setSwitchMode("Offline");

            //Añadir despues las funciones para que todo se almacene en la base de datos local
        }
        else {
            NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                    // Si hay conexión a Internet, mostrar la alerta de éxito
                    setIsModalConnectionVisible(true);
                    setSwitchMode("Online")
                    //Se podría añadir otra función para empezar a registrar todo directo a la API e ignorar la tabla local.
                } else {
                    // Si no hay conexión a Internet, mostrar el modal de error
                    showErrorModal();
                    cancelOnlineMode();
                }
            });



        }

    }



    function scanNumberClient(numberClient: any) {
        setNumberClient(numberClient)
        setIsInsertCodeModalVisible(true)
        setIsQRModalVisible(false)

    }

    function NumberClientvalidation() {
        if (numberClient === "") {
            setIsModalErrorValiVisibe(true);
        }
        else {
            Alert.alert("Éxito")
        }
    }

    function RegisterValidation() {
        if (newCapture === "" || numberClient === "" || lastCapture === "") {
            setIsModalErrorValiVisibe(true)
        }
        else {

        }
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

            {/*<Text style={styles.Title}>Captura de Lecturas</Text> */}


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
                    trackColor={{ false: '#DF2828', true: 'green' }}

                    onChange={checkconnectionSwitch}
                />
                <Text style={styles.switchText}>{switchMode}</Text>
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
                        marginEnd: 100,
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



            <View style={{ margin: 10, maxHeight: 400 }}>
                <Table style={{ alignSelf: 'center' }} borderStyle={{ borderWidth: 1, borderColor: "#cccccc" }}>
                    <Row
                        data={headers}
                        style={{
                            backgroundColor: '#DF2828',
                        }}

                        height={60}
                        widthArr={[120, 75, 60, 60]}
                        textStyle={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
                    />
                </Table>

                <ScrollView>
                    <Table style={{ alignSelf: 'center' }} borderStyle={{ borderWidth: 1, borderColor: "#cccccc" }}>
                        <TableWrapper>
                            {filteredRows.map((rowData, rowIndex) => (
                                <TouchableOpacity key={rowIndex} onPress={() => openInsertCodeModalWithData(rowData)} style={{}}>
                                    <TableWrapper style={{ flexDirection: 'row', borderColor: "#cccccc", borderBottomWidth: 1 }}>
                                        {rowData.map((cellData, cellIndex) => (
                                            <Cell
                                                key={cellIndex}
                                                data={cellData}
                                                width={headersWidth[cellIndex].width}
                                                style={{ height: 50, borderRightWidth: 1, borderColor: "#cccccc" }}
                                                textStyle={{ color: 'black', textAlign: 'center', fontSize: 13 }}
                                            />
                                        ))}
                                    </TableWrapper>
                                </TouchableOpacity>
                            ))}
                        </TableWrapper>
                    </Table>
                </ScrollView>


            </View>



            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                <TouchableWithoutFeedback onPress={hideModal}>
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
                </TouchableWithoutFeedback>
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

                                <TouchableOpacity style={styles.modalButtonB} onPress={NumberClientvalidation}>
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
                            <Text style={styles.modalTitle}>Facturas vencidas</Text>
                            <Table style={{ alignSelf: 'center' ,marginTop:10}} borderStyle={{ borderWidth: 1, borderColor: "#cccccc" }}>
                                <Row
                                    data={debtHeaders}
                                    style={{
                                        backgroundColor: '#DF2828',
                                    }}

                                    height={60}
                                    widthArr={[120, 70]}
                                    textStyle={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}
                                />
                            </Table>
                            <Table style={{ alignSelf: "center",marginBottom:10 }} borderStyle={{ borderWidth: 1, borderColor: "#cccccc" }}>
                                <TableWrapper style={{ flexDirection: 'row', borderColor: "#cccccc", borderBottomWidth: 1 }}>
                                    <Rows
                                        data={debData}
                                        textStyle={{ color: 'black', textAlign: 'center', fontSize: 15 }}
                                        widthArr={[120, 70]}
                                        style={{height:40}} />

                                </TableWrapper>
                            </Table>
                            <TouchableOpacity style={styles.modalButton} onPress={checkconnectionSave}>
                                <Text style={styles.modalButtonText}>Guardar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalButton} onPress={hideInsertCodeModal}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>
                </View>

            </Modal>

            

            {/*Modal de captura del medidor */}
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
                <TouchableWithoutFeedback onPress={hideModalSave}>
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
                </TouchableWithoutFeedback>
            </Modal>


            {/*Modal de Error */}
            <Modal transparent={true} animationType='slide' visible={isModalErrorVisible}>
                <TouchableWithoutFeedback onPress={hideErrorModal}>
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
                </TouchableWithoutFeedback>
            </Modal>

            {/*Modal de advertencia*/}
            <Modal transparent={true} animationType='slide' visible={isModalAdverVisible}>
                <TouchableWithoutFeedback onPress={hideModalAdver}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Advertencia</Text>
                            <View style={styles.ImageContent}>
                                <Image resizeMode='contain' style={styles.ModalImage} source={require('../../img/advertencia.png')} />

                            </View>
                            <Text style={styles.modalTitle}>¿Estas seguro?</Text>

                            <Text style={styles.subTextB}>Todas las capturas realizadas en modo offline seran enviadas</Text>

                            <View style={styles.ButtonContentModal}>
                                <TouchableOpacity style={styles.modalButtonC} onPress={checkInternetConnection}>
                                    <Text style={styles.modalButtonText} >Si</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButtonC} onPress={hideModalAdver} >
                                    <Text style={styles.modalButtonText} >Cancelar</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </TouchableWithoutFeedback>
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


            <Modal transparent={true} animationType='slide' visible={isModalConnectionVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Éxito</Text>
                        <View style={styles.ImageContent}>
                            <Image style={styles.ModalImage} source={require('../../img/checkGreen.png')} />
                        </View>
                        <Text style={styles.subTextB}>Se ha activado éxitosamente el modo Online</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={hideModalConnectionVisible}>
                            <Text style={styles.modalButtonText}>Entendido</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>


            {/*Modal de error de validaciones */}
            <Modal transparent={true} animationType='slide' visible={isModalErrorValiVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>ERROR</Text>

                        <View style={styles.ImageContent}>
                            <Image style={styles.ModalImage} source={require('../../img/error.png')} />
                        </View>

                        <Text style={styles.subTextB}>No deje campos vacíos</Text>

                        <TouchableOpacity style={styles.modalButton} onPress={hideModalErrorValid}>
                            <Text style={styles.modalButtonText}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>

            {/*Bottom Navigation */}
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                <Tab.Navigator>
                    <Tab.Screen
                        name='Captura'
                        component={LoginScreen}
                        listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); showModal(); } })}
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
    rowContainer: {
        borderBottomWidth: 1,
        borderEndColor: "#cccccc",
        borderEndWidth: 1,

        borderBottomColor: "#cccccc",
    },
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
        alignContent: "center",
        alignSelf: "center",
        width: "90%",

    },
    switchContainer: {

        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 50,
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
        width: "90%",
        alignSelf: "center",
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
        alignSelf: "center",
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
